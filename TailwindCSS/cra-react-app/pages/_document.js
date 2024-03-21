import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

//SPA페이지와 같이 최종 Signle Page document 를 생성한다.
class MyDocument extends Document {
  //모든 페이지 컴포넌트에서 data fetching이 필요한 경우를 위해 선언
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>{/* <meta charSet="utf-8" /> */}</Head>
        <body>
          {/* 사용자가 선택한 메뉴 컴포넌트가 Main컴포넌트 영역에 표시된다. */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
