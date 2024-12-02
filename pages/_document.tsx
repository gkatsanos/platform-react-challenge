import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="A GWI Tech challenge Cat Gallery with Favorite option."
          />
          <meta
            property="og:description"
            content="A GWI Tech challenge Cat Gallery with Favorite option."
          />
          <meta property="og:title" content="GWI Gallery" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="GWI Gallery" />
          <meta
            name="twitter:description"
            content="A GWI Tech challenge Cat Gallery with Favorite option."
          />
        </Head>
        <body className="bg-black antialiased text-slate-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
