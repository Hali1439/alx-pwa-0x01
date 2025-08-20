import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Link to manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* PWA theme color */}
        <meta name="theme-color" content="#FFFFFF" />
        {/* Icons for different devices */}
        <link rel="icon" href="/icons/android-chrome-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-152x152.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
