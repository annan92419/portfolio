"use client";

import { BookOpen, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BookData {
  title: string;
  author: string;
  imageUrl: string | null;
  bookUrl: string | null;
  rating: number | null;
  published: number | null;
}

function decodeHtml(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const FALLBACK_BOOKS: BookData[] = [
  {
    title: "Thinking Better: The Art of the Shortcut",
    author: "Marcus du Sautoy",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780465096404-L.jpg",
    bookUrl: "https://www.goodreads.com/book/show/56895877",
    rating: 3.74,
    published: 2021,
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9780807014281-L.jpg",
    bookUrl: "https://www.goodreads.com/book/show/4069",
    rating: 4.37,
    published: 1946,
  },
];

async function fetchShelf(userId: string, shelf: string, max: number): Promise<BookData[]> {
  const res = await fetch(`/api/goodreads?userId=${userId}&shelf=${shelf}&max=${max}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return (data.books as Array<Record<string, string>>).map((b) => ({
    title: decodeHtml(b.title),
    author: decodeHtml(b.author),
    imageUrl: b.imageUrl || null,
    bookUrl: b.bookUrl || null,
    rating: b.rating ? parseFloat(b.rating) : null,
    published: b.published ? parseInt(b.published) : null,
  }));
}

interface Props {
  goodreadsUserId?: string;
  maxBooks?: number;
}

export function CurrentlyReading({ goodreadsUserId, maxBooks = 2 }: Props) {
  const [books, setBooks] = useState<BookData[]>(FALLBACK_BOOKS);
  const [loading, setLoading] = useState(!!goodreadsUserId);

  useEffect(() => {
    if (!goodreadsUserId) return;
    fetchShelf(goodreadsUserId, "currently-reading", maxBooks)
      .then((b) => { if (b.length > 0) setBooks(b); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [goodreadsUserId, maxBooks]);

  const LiveDot = () => (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
    </span>
  );

  if (loading) {
    return (
      <div>
        <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
          <LiveDot />
          Currently Reading
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="flex animate-pulse gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="h-36 w-24 shrink-0 rounded-xl bg-zinc-800" />
              <div className="flex-1 space-y-3 py-2">
                <div className="h-3 w-4/5 rounded bg-zinc-800" />
                <div className="h-3 w-1/2 rounded bg-zinc-800" />
                <div className="h-3 w-1/4 rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
        <LiveDot />
        Currently Reading
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {books.map((book, i) => (
          <SpotlightCard key={book.title} book={book} featured={i === 0} />
        ))}
      </div>
    </div>
  );
}

function SpotlightCard({ book, featured }: { book: BookData; featured: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);

  const inner = (
    <div className={`group relative flex gap-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/60 ${featured ? "sm:flex-col sm:items-start" : ""}`}>
      {/* subtle gradient tint on featured */}
      {featured && (
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(74,222,128,0.05),transparent_60%)]" />
      )}

      {/* Cover */}
      <div className={`relative shrink-0 overflow-hidden rounded-xl shadow-lg ${featured ? "h-36 w-24 sm:h-44 sm:w-28" : "h-36 w-24"}`}>
        {book.imageUrl && !imgFailed ? (
          <img
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800">
            <BookOpen size={22} className="text-zinc-600" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-col justify-center gap-1.5">
        <p className={`font-semibold leading-snug text-zinc-100 ${featured ? "text-base" : "text-sm"} line-clamp-3`}>
          {book.title}
        </p>
        <p className="text-xs text-zinc-500">by {book.author}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
          {book.rating && (
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-zinc-400">{book.rating.toFixed(2)}</span>
            </span>
          )}
          {book.published && <span>{book.published}</span>}
        </div>
      </div>
    </div>
  );

  if (book.bookUrl) {
    return (
      <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

// ─── Already Read ─────────────────────────────────────────────────────────────

interface AlreadyReadProps {
  goodreadsUserId: string;
  maxBooks?: number;
}

export function AlreadyRead({ goodreadsUserId, maxBooks = 12 }: AlreadyReadProps) {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchShelf(goodreadsUserId, "read", maxBooks)
      .then(setBooks)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [goodreadsUserId, maxBooks]);

  if (loading) {
    return (
      <div className="mt-10 border-t border-zinc-800 pt-8">
        <p className="mb-5 text-xs font-medium uppercase tracking-widest text-zinc-500">
          Already Read
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-28 w-[68px] shrink-0 animate-pulse rounded-lg bg-zinc-800" />
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) return null;

  return (
    <div className="mt-10 border-t border-zinc-800 pt-8">
      <p className="mb-5 text-xs font-medium uppercase tracking-widest text-zinc-500">
        Already Read
      </p>

      <div className="relative flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {books.map((book, i) => (
          <SpineCover
            key={book.title + i}
            book={book}
            active={activeIdx === i}
            onEnter={() => setActiveIdx(i)}
            onLeave={() => setActiveIdx(null)}
            tooltipRef={i === activeIdx ? tooltipRef : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function SpineCover({
  book,
  active,
  onEnter,
  onLeave,
  tooltipRef,
}: {
  book: BookData;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  tooltipRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const cover = (
    <div
      className={`relative h-28 w-[68px] shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-200 ${
        active
          ? "scale-110 shadow-lg shadow-green-500/20 ring-1 ring-green-500/60"
          : "opacity-75 hover:opacity-100"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {book.imageUrl && !imgFailed ? (
        <img
          src={book.imageUrl}
          alt={`Cover of ${book.title}`}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-zinc-800 px-1">
          <BookOpen size={16} className="text-zinc-600" />
          <p className="line-clamp-3 text-center text-[8px] leading-tight text-zinc-600">
            {book.title}
          </p>
        </div>
      )}

      {active && (
        <div
          ref={tooltipRef}
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 w-44 -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-900 p-3 shadow-xl"
        >
          <p className="line-clamp-2 text-xs font-semibold leading-snug text-zinc-100">
            {book.title}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">by {book.author}</p>
          {book.rating && (
            <span className="mt-1.5 flex items-center gap-1 text-[11px] text-zinc-500">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              {book.rating.toFixed(2)}
            </span>
          )}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-700" />
        </div>
      )}
    </div>
  );

  if (book.bookUrl) {
    return (
      <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">
        {cover}
      </a>
    );
  }
  return cover;
}
