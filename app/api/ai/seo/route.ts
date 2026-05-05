import { NextRequest, NextResponse } from "next/server";
import { generateWithAI } from "@/lib/ai";
export async function POST(req:NextRequest){const {content}=await req.json();const text=await generateWithAI(`Return JSON only with keys: seo_title, meta_description, keyword_suggestions, discover_headlines, readability_suggestions, seo_score, fixes. Analyze: ${content}`); try{return NextResponse.json(JSON.parse(text));}catch{return NextResponse.json({raw:text,seo_score:70,fixes:["Model response parsing fallback"]});}}
