import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DGIST 안전보안팀',
  description: 'DGIST 안전보안팀 소개 랜딩페이지',
  robots: 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
