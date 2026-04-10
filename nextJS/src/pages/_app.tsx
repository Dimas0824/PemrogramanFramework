import "@/styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/AppShell";
import { SessionProvider } from "next-auth/react";
import { appSansFont } from "@/lib/fonts";

const GoogleAnalytics = dynamic(() => import("@/components/analytics/GoogleAnalytics"), {
  ssr: false,
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div className={appSansFont.className}>
      <GoogleAnalytics />
      <SessionProvider session={session}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </SessionProvider>
    </div>
  );
}
