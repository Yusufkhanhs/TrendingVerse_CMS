import { getSupabaseServer } from "@/lib/supabase";
export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const db = getSupabaseServer();
  const { data: article } = await db.from("articles").select("*").eq("slug", params.slug).single();
  if (!article) return <main className="p-6">Not found</main>;
  await db.from("article_views").insert({ article_id: article.id });
  const { data: related } = await db.from("articles").select("title,slug").neq("id", article.id).eq("category_id", article.category_id).limit(4);
  return <main className="max-w-3xl mx-auto p-6"><div className="card"><h1 className="text-3xl font-bold">{article.title}</h1><div className="my-4 text-sm">Ad Slot: In-Article</div><article className="prose" dangerouslySetInnerHTML={{ __html: article.content }} /><section className="mt-8"><h3 className="font-semibold">Related</h3>{related?.map((r)=> <a key={r.slug} href={`/article/${r.slug}`} className="block">{r.title}</a>)}</section></div></main>
}
