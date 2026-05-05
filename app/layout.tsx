import "./globals.css";
import { ReactNode } from "react";
export const metadata = { title: "TrendingVerse CMS", description: "Digital publishing platform" };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
