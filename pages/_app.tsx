import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import useSWR, { SWRConfig } from "swr";
import httpClient from "@/libs/httpClient";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      /* ----------------------- config SWR global time ---------------------- */
      value={{
        revalidateOnFocus: true,
        // refreshInterval: 1000,
        fetcher: (url: string) =>
          httpClient.get(url).then((res: any) => res.data),
      }}
    >
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </SWRConfig>
  );
}
