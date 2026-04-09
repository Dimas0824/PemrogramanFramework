import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_ID;

const GoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    if (!measurementId) return;

    const handleRouteChange = (url: string) => {
      const analyticsWindow = window as Window & {
        gtag?: (...args: unknown[]) => void;
      };

      // Navigasi Pages Router terjadi di sisi klien, jadi kirimkan jalur halaman yang diperbarui setelah setiap perubahan rute.
      analyticsWindow.gtag?.("config", measurementId, {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
