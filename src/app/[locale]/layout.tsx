import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Wei Lingfeng - LLM Application Full-Stack Engineer",
  description: "Passionate about AI applications, full-stack development, and bringing innovative ideas to life. Experienced in LLM frameworks, agent systems, and modern web technologies.",
  keywords: ["Wei Lingfeng", "LLM", "AI", "Full-stack", "Engineer", "React", "Next.js"],
  authors: [{ name: "Wei Lingfeng" }],
  openGraph: {
    title: "Wei Lingfeng - LLM Application Full-Stack Engineer",
    description: "Passionate about AI applications, full-stack development, and bringing innovative ideas to life.",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // For static export, we need to load messages directly
  // instead of using getMessages() which relies on headers
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    // Fallback for static export - load messages directly
    messages = (await import(`../../messages/${locale}.json`)).default;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
