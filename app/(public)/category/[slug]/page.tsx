import { getSupabaseServer } from "@/lib/supabase";
export default async function CategoryPage({ params }: { params: { slug: string } }) {
 const db = getSupabaseServer();
 const { data: c } = await db.from("categories").select("id,name").eq("slug", params.slug).single();
 const { data: articles } = c ? await db.from("articles").select("id,title,slug,excerpt").eq("category_id", c.id).eq("status","published") : { data: [] as any[] };
 return <main className="max-w-5xl mx-auto p-6"><h1 className="text-2xl font-bold mb-4">{c?.name}</h1>{articles?.map((a)=> <div key={a.id} className="card mb-3"><a href={`/article/${a.slug}`}>{a.title}</a></div>)}</main>
}
