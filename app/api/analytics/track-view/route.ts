import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";
export async function POST(req:NextRequest){const {article_id,referrer}=await req.json();const db=getSupabaseServer();await db.from('article_views').insert({article_id,referrer});return NextResponse.json({ok:true});}
