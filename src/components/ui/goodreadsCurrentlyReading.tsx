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

const FALLBACK_BOOKS: BookData[] = [
  {
    title: "Thinking Better",
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
    title: b.title,
    author: b.author,
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
      .catch(() => { /* keep fallback */ })
      .finally(() => setLoading(false));
  }, [goodreadsUserId, maxBooks]);

  if (loading) {
    return (
      <div className="mt-10 border-t border-zinc-800 pt-8">
        <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-600">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
          </span>
          Currently Reading
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex animate-pulse gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="h-24 w-16 shrink-0 rounded-lg bg-zinc-800" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 w-3/4 rounded bg-zinc-800" />
                <div className="h-3 w-1/2 rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-zinc-800 pt-8">
      <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-600">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
        </span>
        Currently Reading
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}

function BookCard({ book }: { book: BookData }) {
  const [imgFailed, setImgFailed] = useState(false);

  const content = (
    <div className="group flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-800/70">
      {/* Cover */}
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg shadow-md">
        {book.imageUrl && !imgFailed ? (
          <img
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800">
            <BookOpen size={20} className="text-zinc-600" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-col justify-center gap-1">
        <p className="truncate text-sm font-semibold leading-snug text-zinc-100">
          {book.title}
        </p>
        <p className="truncate text-xs text-zinc-500">by {book.author}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-zinc-600">
          {book.rating && (
            <span className="flex items-center gap-1">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              {book.rating.toFixed(2)}
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
        {content}
      </a>
    );
  }
  return content;
}

// ─── Already Read ────────────────────────────────────────────────────────────

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
      .catch(() => { /* silently show nothing */ })
      .finally(() => setLoading(false));
  }, [goodreadsUserId, maxBooks]);

  if (loading) {
    return (
      <div className="mt-8 border-t border-zinc-800 pt-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
          Already Read
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-20 w-[52px] shrink-0 animate-pulse rounded-md bg-zinc-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) return null;

  return (
    <div className="mt-8 border-t border-zinc-800 pt-8">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
        Already Read
      </p>

      <div className="relative flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
      className={`relative h-20 w-[52px] shrink-0 cursor-pointer overflow-hidden rounded-md shadow-md transition-all duration-200 ${
        active ? "scale-110 ring-1 ring-green-500/60 shadow-green-500/20 shadow-lg" : "opacity-80 hover:opacity-100"
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
          <BookOpen size={14} className="text-zinc-600" />
          <p className="text-center text-[8px] leading-tight text-zinc-600 line-clamp-3">
            {book.title}
          </p>
        </div>
      )}

      {/* hover tooltip */}
      {active && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full left-1/2 z-50 mb-2 w-40 -translate-x-1/2 rounded-lg border border-zinc-700 bg-zinc-900 p-2.5 shadow-xl pointer-events-none"
        >
          <p className="text-xs font-semibold leading-snug text-zinc-100 line-clamp-2">
            {book.title}
          </p>
          <p className="mt-0.5 text-[11px] text-zinc-500">by {book.author}</p>
          {book.rating && (
            <span className="mt-1 flex items-center gap-1 text-[11px] text-zinc-600">
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              {book.rating.toFixed(2)}
            </span>
          )}
          {/* arrow */}
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
