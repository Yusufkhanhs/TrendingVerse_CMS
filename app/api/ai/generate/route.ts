import { NextRequest, NextResponse } from "next/server";
import { generateWithAI } from "@/lib/ai";
export async function POST(req:NextRequest){const {prompt}=await req.json();const text=await generateWithAI(`Write a newsroom-quality article with SEO optimization, headings, and facts. Topic: ${prompt}`);return NextResponse.json({text});}
