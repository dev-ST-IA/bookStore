import React from "react";
import Head from "next/head";

export default function MetaHead() {
  return (
    <Head>
      <title>The Book Store</title>
      <meta name="Book Store Web App" content="Book Store" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
