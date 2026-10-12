import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getSiteContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

/** Title and description come from the profile's SEO fields in the admin dashboard. */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const { profile } = await getSiteContent();
    return {
      title: profile.seo.title || profile.fullName,
      description: profile.seo.description || undefined,
    };
  } catch {
    // The page shows the error; metadata shouldn't add a second failure.
    return { title: "Portfolio" };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
