"use client";

import { BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MorphingArrowButton } from "@/components/ui/morphing-arrow-button";

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

// ─── Draggable card (no arrows — arrows live at column level) ─────────────────

const ROTATIONS = ["-5deg", "0deg", "4deg"];
const X_OFFSETS = ["0%", "15%", "30%"];

function StackCard({
  book,
  position,
  total,
  isFront,
  onNext,
}: {
  book: BookData;
  position: number;
  total: number;
  isFront: boolean;
  onNext: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const pos = Math.min(position, ROTATIONS.length - 1);

  return (
    <motion.div
      style={{ zIndex: total - position }}
      animate={{ rotate: ROTATIONS[pos], x: X_OFFSETS[pos] }}
      drag={isFront ? "x" : false}
      dragElastic={0.5}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => { if (info.offset.x < -50) onNext(); }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 h-[260px] w-[180px] select-none overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900 shadow-xl ${
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      }`}
    >
      <div className="h-[182px] w-full overflow-hidden bg-zinc-800">
        {book.imageUrl && !imgFailed ? (
          <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" loading="lazy" onError={() => setImgFailed(true)} />
        ) : (
          <div className="flex h-full w-full items-center justify-center"><BookOpen size={28} className="text-zinc-600" /></div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 p-3">
        <p className="line-clamp-1 text-[11px] font-semibold text-zinc-100">{book.title}</p>
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

function BookStack({ books, order, onNext }: { books: BookData[]; order: number[]; onNext: () => void }) {
  return (
    <div className="relative h-[260px] w-[234px]">
      {books.map((book, i) => (
        <StackCard
          key={book.title}
          book={book}
          position={order.indexOf(i)}
          total={books.length}
          isFront={order.indexOf(i) === 0}
          onNext={onNext}
        />
      ))}
    </div>
  );
}

// ─── Spine cover ──────────────────────────────────────────────────────────────

function SpineCover({ book, active, onEnter, onLeave, tooltipRef }: {
  book: BookData; active: boolean;
  onEnter: () => void; onLeave: () => void;
  tooltipRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const cover = (
    <div
      className={`relative h-[120px] w-[78px] shrink-0 cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-200 ${
        active ? "scale-110 shadow-lg shadow-green-500/20 ring-1 ring-green-500/60" : "opacity-75 hover:opacity-100"
      }`}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
    >
      {book.imageUrl && !imgFailed ? (
        <img src={book.imageUrl} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" loading="lazy" onError={() => setImgFailed(true)} />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-zinc-800 px-1">
          <BookOpen size={18} className="text-zinc-600" />
          <p className="line-clamp-3 text-center text-[8px] leading-tight text-zinc-600">{book.title}</p>
        </div>
      )}
      {active && (
        <div ref={tooltipRef} className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2.5 w-44 -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-900 p-3 shadow-xl">
          <p className="line-clamp-2 text-xs font-semibold leading-snug text-zinc-100">{book.title}</p>
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

  if (book.bookUrl) return <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">{cover}</a>;
  return cover;
}

// ─── Two-row shelf (no arrows — arrows live at column level) ──────────────────

function ReadShelf({ books, row1Ref, row2Ref }: {
  books: BookData[];
  row1Ref: React.RefObject<HTMLDivElement | null>;
  row2Ref: React.RefObject<HTMLDivElement | null>;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const split = Math.ceil(books.length / 2);
  const row1 = books.slice(0, split);
  const row2 = books.slice(split);

  const renderRow = (rowBooks: BookData[], offset: number, ref: React.RefObject<HTMLDivElement | null>) => (
    <div ref={ref} className="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {rowBooks.map((book, i) => (
        <SpineCover
          key={book.title + (i + offset)}
          book={book}
          active={activeIdx === i + offset}
          onEnter={() => setActiveIdx(i + offset)}
          onLeave={() => setActiveIdx(null)}
          tooltipRef={(i + offset) === activeIdx ? tooltipRef : undefined}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {renderRow(row1, 0, row1Ref)}
      {row2.length > 0 && renderRow(row2, split, row2Ref)}
    </div>
  );
}

// ─── Unified section ──────────────────────────────────────────────────────────

interface Props {
  goodreadsUserId?: string;
  maxCurrently?: number;
  maxRead?: number;
}

export function ReadingSection({ goodreadsUserId, maxCurrently = 5, maxRead = 50 }: Props) {
  const [currentBooks, setCurrentBooks] = useState<BookData[]>(FALLBACK_BOOKS);
  const [readBooks, setReadBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(!!goodreadsUserId);

  // card stack order
  const [order, setOrder] = useState<number[]>([]);
  useEffect(() => { setOrder(currentBooks.map((_, i) => i)); }, [currentBooks]);
  const handleNext = () => setOrder(prev => { const n = [...prev]; n.push(n.shift()!); return n; });
  const handlePrev = () => setOrder(prev => { const n = [...prev]; n.unshift(n.pop()!); return n; });

  // shelf scroll refs
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const scrollBoth = (dir: "left" | "right") => {
    const amount = dir === "right" ? 320 : -320;
    row1Ref.current?.scrollBy({ left: amount, behavior: "smooth" });
    row2Ref.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

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
      <div className="flex flex-col gap-12 sm:flex-row sm:items-stretch sm:gap-16">
        <div className="flex w-full shrink-0 flex-col justify-between items-center gap-4 sm:w-auto sm:items-start">
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500"><LiveDot /> Reading</p>
            <div className="relative h-[260px] w-[234px]">
              {[0,1,2].map(i => <div key={i} style={{ zIndex: 3-i, left: `${i*15}%` }} className="absolute h-[260px] w-[180px] animate-pulse rounded-xl bg-zinc-800" />)}
            </div>
          </div>
          <div className="flex w-[234px] items-center justify-between">
            <MorphingArrowButton direction="left" onClick={handlePrev} />
            <MorphingArrowButton direction="right" onClick={handleNext} />
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Read</p>
            <div className="flex flex-col gap-2">
              {[0,1].map(row => <div key={row} className="flex gap-1">{Array.from({length:8}).map((_,i) => <div key={i} className="h-[120px] w-[78px] shrink-0 animate-pulse rounded-lg bg-zinc-800" />)}</div>)}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <MorphingArrowButton direction="left" onClick={() => scrollBoth("left")} />
            <MorphingArrowButton direction="right" onClick={() => scrollBoth("right")} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 sm:flex-row sm:items-stretch sm:gap-16">

      {/* ── Card stack column ── */}
      <div className="flex w-full shrink-0 flex-col items-center justify-between gap-6 sm:w-auto sm:items-start">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
            <LiveDot /> Reading
          </p>
          {order.length > 0 && (
            <BookStack books={currentBooks} order={order} onNext={handleNext} />
          )}
        </div>
        {currentBooks.length > 1 && (
          <div className="flex w-[234px] items-center justify-between">
            <MorphingArrowButton direction="left" onClick={handlePrev} />
            <MorphingArrowButton direction="right" onClick={handleNext} />
          </div>
        )}
      </div>

      {/* ── Shelf column ── */}
      {readBooks.length > 0 && (
        <div className="flex min-w-0 flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Read</p>
            <ReadShelf books={readBooks} row1Ref={row1Ref} row2Ref={row2Ref} />
          </div>
          <div className="flex items-center justify-between">
            <MorphingArrowButton direction="left" onClick={() => scrollBoth("left")} />
            <MorphingArrowButton direction="right" onClick={() => scrollBoth("right")} />
          </div>
        </div>
      )}

    </div>
  );
}

export function CurrentlyReading({ goodreadsUserId: _ }: { goodreadsUserId?: string }) { return null; }
export function AlreadyRead({ goodreadsUserId: _ }: { goodreadsUserId: string }) { return null; }
