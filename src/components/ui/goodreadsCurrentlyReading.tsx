"use client";

import { BookOpen, Star } from "lucide-react";
import { motion, PanInfo } from "framer-motion";
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

// ─── Book stack card (draggable) ──────────────────────────────────────────────

function StackCard({
  book,
  position,
  total,
  isFront,
  onShuffle,
}: {
  book: BookData;
  position: number;
  total: number;
  isFront: boolean;
  onShuffle: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const rotations = ["-5deg", "0deg", "5deg", "8deg"];
  const xPercents = ["0%", "18%", "36%", "52%"];

  return (
    <motion.div
      style={{ zIndex: total - position }}
      animate={{
        rotate: rotations[Math.min(position, rotations.length - 1)],
        x: xPercents[Math.min(position, xPercents.length - 1)],
      }}
      drag={isFront}
      dragElastic={0.3}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -60) onShuffle();
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 h-[260px] w-[180px] overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-xl select-none ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {/* Cover */}
      <div className="relative h-[182px] w-full overflow-hidden bg-zinc-800">
        {book.imageUrl && !imgFailed ? (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen size={28} className="text-zinc-600" />
          </div>
        )}
      </div>

      {/* Info strip */}
      <div className="flex flex-col gap-0.5 p-3">
        <p className="line-clamp-1 text-[11px] font-semibold leading-snug text-zinc-100">
          {book.title}
        </p>
        <p className="line-clamp-1 text-[10px] text-zinc-500">{book.author}</p>
        {book.rating && (
          <span className="mt-1 flex items-center gap-1 text-[10px] text-zinc-600">
            <Star size={9} className="fill-yellow-400 text-yellow-400" />
            {book.rating.toFixed(2)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function BookStack({ books }: { books: BookData[] }) {
  const [order, setOrder] = useState(() => books.map((_, i) => i));

  const handleShuffle = () => {
    setOrder((prev) => {
      const next = [...prev];
      next.push(next.shift()!);
      return next;
    });
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {/* relative container sized to one card + stack offset */}
      <div className="relative h-[260px] w-[250px]">
        {books.map((book, i) => (
          <StackCard
            key={book.title}
            book={book}
            position={order.indexOf(i)}
            total={books.length}
            isFront={order.indexOf(i) === 0}
            onShuffle={handleShuffle}
          />
        ))}
      </div>
      {books.length > 1 && (
        <p className="text-[10px] text-zinc-600 tracking-wide">← drag to browse</p>
      )}
    </div>
  );
}

// ─── Spine cover (already read shelf) ────────────────────────────────────────

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

// ─── Main export: unified reading section ────────────────────────────────────

interface Props {
  goodreadsUserId?: string;
  maxCurrently?: number;
  maxRead?: number;
}

export function ReadingSection({ goodreadsUserId, maxCurrently = 3, maxRead = 50 }: Props) {
  const [currentBooks, setCurrentBooks] = useState<BookData[]>(FALLBACK_BOOKS);
  const [readBooks, setReadBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(!!goodreadsUserId);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!goodreadsUserId) return;

    Promise.allSettled([
      fetchShelf(goodreadsUserId, "currently-reading", maxCurrently),
      fetchShelf(goodreadsUserId, "read", maxRead),
    ]).then(([curr, read]) => {
      if (curr.status === "fulfilled" && curr.value.length > 0) setCurrentBooks(curr.value);
      if (read.status === "fulfilled") setReadBooks(read.value);
      setLoading(false);
    });
  }, [goodreadsUserId, maxCurrently, maxRead]);

  const LiveDot = () => (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
    </span>
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-12 sm:flex-row sm:gap-16">
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            <LiveDot /> Reading
          </p>
          <div className="relative h-[260px] w-[250px]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{ zIndex: 3 - i, rotate: `${(i - 1) * 5}deg`, left: `${i * 18}%` }}
                className="absolute h-[260px] w-[180px] animate-pulse rounded-xl bg-zinc-800"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Read</p>
          <div className="flex gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 w-[68px] shrink-0 animate-pulse rounded-lg bg-zinc-800" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:gap-16">
      {/* Currently reading stack */}
      <div className="flex flex-col gap-4 shrink-0">
        <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
          <LiveDot /> Reading
        </p>
        <BookStack books={currentBooks} />
      </div>

      {/* Already read shelf */}
      {readBooks.length > 0 && (
        <div className="flex flex-col gap-4 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            Read
          </p>
          <div className="relative flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {readBooks.map((book, i) => (
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
      )}
    </div>
  );
}

// Keep old exports as aliases so nothing else breaks
export function CurrentlyReading({ goodreadsUserId }: { goodreadsUserId?: string }) {
  return null;
}
export function AlreadyRead({ goodreadsUserId }: { goodreadsUserId: string }) {
  return null;
}
