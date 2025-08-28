import "@/styles/globals.css";

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
