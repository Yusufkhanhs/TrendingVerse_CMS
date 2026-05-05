import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";
export async function GET(){const db=getSupabaseServer();const {data}=await db.from('articles').select('*').order('created_at',{ascending:false});return NextResponse.json(data??[])}
export async function POST(req:NextRequest){const body=await req.json();const db=getSupabaseServer();const {data,error}=await db.from('articles').insert(body).select().single();if(error) return NextResponse.json({error:error.message},{status:400});return NextResponse.json(data)}
