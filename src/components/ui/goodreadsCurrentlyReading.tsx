"use client";

import { BookOpen, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface BookData {
  title: string;
  author: string;
  imageUrl: string | null;
  bookUrl: string | null;
  rating: number | null;
  published: number | null;
}

// Static fallback — shown when no Goodreads ID is provided or fetch fails.
// Update goodreadsUserId prop when you have your Goodreads profile ID.
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

function parseRSSItem(item: Element): BookData {
  const title =
    item.querySelector("title")?.textContent?.trim() ?? "Unknown Title";
  const author =
    item.querySelector("author_name")?.textContent?.trim() ?? "Unknown Author";
  const rating = item.querySelector("average_rating")?.textContent?.trim();
  const published = item.querySelector("book_published")?.textContent?.trim();
  const bookId = item.querySelector("book_id")?.textContent?.trim();
  const largeImage = item
    .querySelector("book_large_image_url")
    ?.textContent?.trim();
  const mediumImage = item
    .querySelector("book_medium_image_url")
    ?.textContent?.trim();
  const smallImage = item
    .querySelector("book_small_image_url")
    ?.textContent?.trim();

  return {
    title,
    author,
    imageUrl: largeImage ?? mediumImage ?? smallImage ?? null,
    bookUrl: bookId
      ? `https://www.goodreads.com/book/show/${bookId}`
      : null,
    rating: rating ? parseFloat(rating) : null,
    published: published ? parseInt(published) : null,
  };
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

    const RSS_URL = `https://www.goodreads.com/review/list_rss/${goodreadsUserId}?shelf=currently-reading`;

    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (!data.contents) throw new Error("Empty response");

        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        if (xml.querySelector("parsererror")) throw new Error("Bad XML");

        const items = Array.from(xml.querySelectorAll("item")).slice(
          0,
          maxBooks
        );
        if (items.length === 0) throw new Error("Empty shelf");

        setBooks(items.map(parseRSSItem));
      } catch {
        // Keep fallback data on any error
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
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
