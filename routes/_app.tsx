import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";

const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator &&
    navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        {/* Fonts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Gotham';
                src: url(${asset("/fonts/Gotham-Book.otf")}) format("opentype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: 'Gotham';
                src: url(${asset("/fonts/Gotham-Bold.otf")}) format("opentype");
                font-weight: 700;
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: 'Gotham';
                src: url(${
              asset("/fonts/Gotham-BoldItalic.otf")
            }) format("opentype");
                font-weight: 700;
                font-style: italic;
                font-display: swap;
              }

              @font-face {
                font-family: 'Gotham';
                src: url(${
              asset("/fonts/Gotham-Black.otf")
            }) format("opentype");
                font-weight: 800;
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: 'Gotham';
                src: url(${
              asset("/fonts/Gotham-BookItalic.otf")
            }) format("opentype");
                font-weight: 400;
                font-style: italic;
                font-display: swap;
              }

              @font-face {
                font-family: 'Gotham';
                src: url(${
              asset("/fonts/Gotham-LightItalic.otf")
            }) format("opentype");
                font-weight: 300;
                font-style: italic;
                font-display: swap;
              }

              @font-face {
                font-family: 'Gotham';
                src: url(${
              asset("/fonts/Gotham-Medium.otf")
            }) format("opentype");
                font-weight: 500;
                font-style: normal;
                font-display: swap;
              }

              @font-face {
                font-family: 'Gotham';
                src: url(${
              asset("/fonts/Gotham-Ultra.otf")
            }) format("opentype");
                font-weight: 900;
                font-style: normal;
                font-display: swap;
              }
            `,
          }}
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Service Worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
