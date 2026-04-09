import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from "@/components/layouts/AppShell";
import { SessionProvider } from "next-auth/react";
import { appSansFont } from "@/lib/fonts";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

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
