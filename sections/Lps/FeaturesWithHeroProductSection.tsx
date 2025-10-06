// sections/Lps/FeaturesWithHeroProductSection.tsx
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

type ImageWidget = string;

interface FeatureItem {
  iconSrc?: ImageWidget;
  iconAlt?: string;
  title?: string;
  highlightText?: string;
  description?: string;
}

interface Props {
  section?: ISection;
  backgroundColor?: string;

  heroImageSrc?: ImageWidget;
  heroImageAlt?: string;

  features?: FeatureItem[];
  highlightColor?: string;

  iconSizePx?: number;
  heroMaxWidthPx?: number;

  cardPtMobile?: number;
  cardPtDesktop?: number;
  cardPbMobile?: number;
  cardPbDesktop?: number;
}

export default function FeaturesWithHeroProductSection({
  section,
  backgroundColor = "#E51E49",
  heroImageSrc,
  heroImageAlt = "Productos Frigidaire",
  features = [],
  highlightColor = "#E51E49",
  heroMaxWidthPx = 980,
  cardPtMobile = 24,
  cardPtDesktop = 40,
  cardPbMobile = 24,
  cardPbDesktop = 40,
}: Props) {
  const id = useId();

  const {
    fullWidth,
    marginTopMobile = 0,
    marginBottomMobile = 0,
    marginTopDesktop,
    marginBottomDesktop,
  } = section ?? {};

  // mantém margens como inline-style (ok)
  const inlineStyles: preact.JSX.CSSProperties = {
    marginTop: `${marginTopMobile}px`,
    marginBottom: `${marginBottomMobile}px`,
    ...(marginTopDesktop && { marginTop: `${marginTopDesktop}px` }),
    ...(marginBottomDesktop && { marginBottom: `${marginBottomDesktop}px` }),
  };

  return (
    <Section
      id={id}
      // passa a cor original p/ desktop via CSS var
      style={{ ...inlineStyles, ["--desk-bg" as const]: backgroundColor }}
      // mobile: branco | desktop: cor original
      class="border-none bg-white md:bg-[var(--desk-bg)]"
    >
      <Section.Container
        fullWidth={fullWidth}
        class="w-full md:px-14 bg-transparent border-none"
      >
        <div class="w-full max-w-[1500px] mx-auto">
          {/* CARD com gradiente: mobile 20/15, desktop 50/50 */}
          <div
            class={`relative overflow-hidden
              pt-[${cardPtMobile}px] md:pt-[${cardPtDesktop}px]
              pb-[${cardPbMobile}px] md:pb-[${cardPbDesktop}px]
              bg-[linear-gradient(to_bottom,_#E51E49_0_20%,_#FFFFFF_15%_100%)]
              md:bg-[linear-gradient(to_bottom,_#E51E49_0_50%,_#FFFFFF_50%_100%)]
            `}
          >
            {/* Imagem do produto */}
            {heroImageSrc && (
              <div class="w-full flex justify-center pt-10 md:pt-12">
                <img
                  src={heroImageSrc}
                  alt={heroImageAlt}
                  loading="lazy"
                  decoding="async"
                  class={`block h-auto w-full max-w-[${heroMaxWidthPx}px]`}
                />
              </div>
            )}

            {/* Grid de features */}
            <div class="grid gap-10 md:gap-12
                mt-6 md:mt-10
                md:px-12
                pb-10 md:pb-12
                md:grid-cols-1 xl:grid-cols-2
                bg-white">
              {features.map((f, i) => (
                <div key={i} class="text-center max-w-[523px] mx-auto">
                  {f.iconSrc && (
                    <div class="mb-4 md:mb-5 flex justify-center">
                      <img
                        src={f.iconSrc}
                        alt={f.iconAlt ?? ""}
                        loading="lazy"
                        decoding="async"
                        /* MOBILE: 69x69 + mt-30 | DESKTOP: 115x115 e sem mt */
                        class="object-contain w-[69px] h-[69px] mt-[30px] md:w-[115px] md:h-[115px] md:mt-0"
                      />
                    </div>
                  )}

                  <h3
                    /* MOBILE: 20px | DESKTOP: 36/48 */
                    class="font-bold text-[20px] leading-normal md:text-[36px] md:leading-[48px] text-[#E51E49]"
                    style={{ fontFamily: "Gotham", textAlign: "center" }}
                  >
                    {renderTitle(
                      f.title ?? "",
                      f.highlightText,
                      highlightColor,
                    )}
                  </h3>

                  {f.description && (
                    <p
                      /* MOBILE: 20px | DESKTOP: 24/26 + mt */
                      class="mt-0 md:mt-4 px-8 md:px-0 text-[20px] leading-normal md:text-[24px] md:leading-[26px] text-[#E51E49]"
                      style={{ fontFamily: "Gotham", textAlign: "center" }}
                    >
                      {f.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section.Container>
    </Section>
  );
}

function renderTitle(text: string, highlight?: string, color?: string) {
  if (!highlight || !text.includes(highlight)) return text;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span
        class="font-bold"
        style={{
          color: color ?? "inherit",
          fontFamily: "Gotham",
        }}
      >
        {highlight}
      </span>
      {after}
    </>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[360px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
