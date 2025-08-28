import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>App de Metas</title>
    </Head>
      <Component {...pageProps} />
    </>
  )
    
    
}
