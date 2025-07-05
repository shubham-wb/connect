import { StateProvider } from "@/context/StateContext";
import "@/styles/globals.css";
import reducer, { initialState } from "@/context/StateReducers";
import Head from "next/head";
import { Karla } from "next/font/google"

const karla = Karla({ subsets: ['latin'] })

// If loading a variable font, you don't need to specify the font weight

export default function App({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState}
      reducer={reducer}
    >
      <Head>
        <title>
          Whatsapp
        </title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <main className={karla.className} >
        <Component {...pageProps} />
      </main>
    </StateProvider>
  )
}
