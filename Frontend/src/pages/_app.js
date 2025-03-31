import Head from "next/head";
import "../global.css";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return <>
    <Head>
    {/* <link rel="icon" href="/images/Arrow-logo.png" /> */}
    <title>Dream Books</title>
      <meta name="description" content=""/>
    </Head>
      <main>
      <Toaster 
        theme={"light"} 
        position={"bottom-right"} 
        offset={"20px"}
        richColors={true}
        toastOptions= {{
          className: 'job-seeker-toaster',
          duration: 5000,
        }}  
      />
      <Component {...pageProps} />
    </main>
  </>
}
