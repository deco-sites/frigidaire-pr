// sections/Lps/VideoInfoCardLogoSection.tsx
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

type ImageWidget = string;

interface Props {
  section?: ISection;
  logoSrc?: ImageWidget;
  logoAlt?: string;

  brandBarColor?: string;

  youtubeUrl?: string;

  title?: string;
  description?: string;
}

function toEmbedSrc(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
    if (u.pathname.startsWith("/embed/")) return url;
    return url;
  } catch {
    return null;
  }
}

export default function VideoInfoCardLogoSection({
  section,
  logoSrc,
  logoAlt = "FRIGIDAIRE",
  brandBarColor = "#E51E49",
  youtubeUrl,
  title = "Atrévete a redescubrir tu cocina",
  description = "Crea, comparte y disfruta cada momento como nunca antes",
}: Props) {
  const id = useId();

  const {
    fullWidth,
    marginTopMobile = 0,
    marginBottomMobile = 0,
    marginTopDesktop,
    marginBottomDesktop,
  } = section ?? {};

  // mantém suporte a 0 explícito no desktop
  const inlineStyles: preact.JSX.CSSProperties = {
    marginTop: `${marginTopMobile}px`,
    marginBottom: `${marginBottomMobile}px`,
    ...(marginTopDesktop != null ? { marginTop: `${marginTopDesktop}px` } : {}),
    ...(marginBottomDesktop != null
      ? { marginBottom: `${marginBottomDesktop}px` }
      : {}),
  };

  const embed = toEmbedSrc(youtubeUrl);

  return (
    <Section id={id} style={inlineStyles} class="border-none bg-transparent">
      <Section.Container
        fullWidth={fullWidth}
        class="w-full px-0 border-none bg-transparent"
      >
        {/* Faixa do logo — colada no vídeo (sem espaço inferior) */}
        <div
          class="w-full flex justify-center pt-3 md:pt-4 md:pb-4"
          style={{ backgroundColor: brandBarColor }}
        >
          {logoSrc && (
            <img
              src={logoSrc}
              alt={logoAlt}
              class="h-auto max-h-[56px] md:max-h-[72px] object-contain"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        {/* Wrapper para “colar” o vídeo na barra */}
        <div class="w-full overflow-x-hidden -mt-px">
          <div class="w-full mx-auto">
            <div
              class={`
                grid items-stretch
                md:grid-cols-1
                xl:[grid-template-columns:1.59fr_1fr]
              `}
            >
              {/* Painel de texto — MOBILE: primeiro | DESKTOP XL: segundo */}
              <div class="w-full h-full bg-[#323333] text-white flex flex-col justify-center items-center px-[3rem] md:px-[3rem] py-6 md:py-8 order-1 xl:order-2">
                <h2
                  class="font-bold text-[28px] leading-normal md:text-[40px] md:leading-[50px] text-center"
                  style={{ fontFamily: "Gotham" }}
                >
                  {title}
                </h2>
                <p
                  class="mt-3 md:mt-4 font-normal text-[18px] md:text-[26px] md:leading-[30px] text-center"
                  style={{ fontFamily: "Gotham" }}
                >
                  {description}
                </p>
              </div>

              {/* Vídeo — MOBILE: segundo | DESKTOP XL: primeiro */}
              <div class="w-full h-full order-2 xl:order-1">
                <div class="relative w-full aspect-video overflow-hidden rounded-none">
                  {embed
                    ? (
                      <iframe
                        src={`${embed}?rel=0&modestbranding=1`}
                        title="YouTube video"
                        class="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    )
                    : (
                      <div class="absolute inset-0 grid place-items-center border border-dashed rounded-none bg-white/5">
                        <span class="text-sm">
                          Adicione a URL do vídeo do YouTube
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section.Container>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[420px] md:h-[520px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
