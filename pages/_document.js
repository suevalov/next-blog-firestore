import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, css } from "styled-components";
import { normalize } from "polished";
import Theme from "~/utils/theme";

const resetStyles = `

  ${css`
    ${normalize()};
  `}

  body {
    font-family: ${Theme.fonts.family.fallback};
    font-size: ${Theme.fonts.size.normal};
    font-style: normal;
    padding: 0;
    margin: 0;
    color: ${Theme.colors.text};
    background: ${Theme.colors.background};
    -webkit-font-smoothing: subpixel-antialiased;
  }

  .fonts-loaded body {
    font-family: ${Theme.fonts.family.base};
  }

  .root {
    position: relative;
    overflow: auto;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, req }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    const fontsAreLoaded =
      (req.headers.cookie || "").indexOf("fonts-loaded") !== 0;
    return { ...page, styleTags, fontsAreLoaded };
  }

  render() {
    return (
      <html
        lang="en"
        className={this.props.fontsAreLoaded ? "fonts-loaded" : ""}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=yes"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
          <style dangerouslySetInnerHTML={{ __html: resetStyles }} />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&amp;subset=cyrillic"
            rel="stylesheet"
          />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
