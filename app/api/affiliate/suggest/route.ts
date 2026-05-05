import { NextRequest, NextResponse } from "next/server";
const map:{[k:string]:string}={vpn:'https://aff.example/vpn',hosting:'https://aff.example/hosting',laptop:'https://aff.example/laptop'};
export async function POST(req:NextRequest){const {content}=await req.json();const lc=String(content).toLowerCase();const suggestions=Object.entries(map).filter(([k])=>lc.includes(k)).map(([keyword,url])=>({keyword,url}));return NextResponse.json({suggestions});}
