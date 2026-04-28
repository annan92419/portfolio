import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const shelf = searchParams.get("shelf") ?? "currently-reading";
  const max = parseInt(searchParams.get("max") ?? "12");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}&sort=date_read&order=d`;

  try {
    const res = await fetch(rssUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; portfolio-bot/1.0)" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Goodreads returned ${res.status}` }, { status: 502 });
    }

    const xml = await res.text();

    // Extract items with a regex-free approach using basic string parsing
    const items: Record<string, string>[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xml)) !== null && items.length < max) {
      const block = match[1];
      const get = (tag: string) => {
        const m = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([^<]*)<\\/${tag}>`).exec(block);
        return (m?.[1] ?? m?.[2] ?? "").trim();
      };

      const title = get("title");
      const author = get("author_name");
      const rating = get("average_rating");
      const published = get("book_published");
      const bookId = get("book_id");
      const largeImage = get("book_large_image_url");
      const mediumImage = get("book_medium_image_url");
      const smallImage = get("book_small_image_url");

      if (!title) continue;

      items.push({
        title,
        author: author || "Unknown Author",
        imageUrl: largeImage || mediumImage || smallImage || "",
        bookUrl: bookId ? `https://www.goodreads.com/book/show/${bookId}` : "",
        rating,
        published,
      });
    }

    return NextResponse.json({ books: items });
  } catch (err) {
    console.error("Goodreads fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
  }
}
