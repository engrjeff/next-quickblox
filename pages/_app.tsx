import "@/styles/globals.css";
import * as React from "react";
import type { AppProps } from "next/app";
import { QuickbloxProvider } from "@/providers/quickblox-provider";
import Head from "next/head";
import { fontSans } from "@/config/site";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <QuickbloxProvider>
          <Head>
            <title>Petpal Vet Chat - POC</title>
            <meta
              name="description"
              content="A POC app for Petpal Vet Chat feature"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className={fontSans.className}>
            <Component {...pageProps} />
          </div>
        </QuickbloxProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
