import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase";

export default async function HomePage() {
  const db = getSupabaseServer();
  const { data } = await db.from("articles").select("id,title,slug,excerpt,featured_image_url,is_sponsored,published_at").eq("status","published").order("published_at", { ascending: false }).limit(20);
  return <main className="max-w-6xl mx-auto p-6"><h1 className="text-3xl font-bold mb-6">TrendingVerse</h1><div className="grid md:grid-cols-3 gap-4">{(data ?? []).map((a)=> <article key={a.id} className="card"><h2 className="font-semibold text-lg"><Link href={`/article/${a.slug}`}>{a.title}</Link></h2>{a.is_sponsored && <span className="text-xs text-amber-600">Sponsored</span>}<p className="text-sm mt-2 text-slate-600">{a.excerpt}</p></article>)}</div></main>;
}
