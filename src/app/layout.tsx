import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DGIST 안전보안팀',
  description: 'DGIST 안전보안팀 소개 랜딩페이지',
  robots: 'noindex, nofollow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Maps 사전 연결 — 지도 iframe 로딩 가속 */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
