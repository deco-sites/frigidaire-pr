// sections/Lps/ImageTextFeatureSection.tsx
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

type ImageWidget = string;

interface Props {
  section?: ISection;
  backgroundColor?: string;
  title?: string;
  imageSrc?: ImageWidget;
  imageAlt?: string;
  description?: string;

  /** Opcional: se informado, esta versão será usada **só no mobile** */
  descriptionMobile?: string;

  leftPx?: number;
  rightPx?: number;
  textMaxPx?: number;
}

/** Renderiza texto com suporte a **negrito** e \n */
function RichInline({
  text,
  normalClass,
  boldClass,
  style,
}: {
  text: string;
  normalClass: string;
  boldClass: string;
  style?: preact.JSX.CSSProperties;
}) {
  const lines = (text ?? "").split("\n");
  return (
    <span style={style}>
      {lines.map((line, li) => {
        const parts = line.split("**");
        return (
          <span key={`l-${li}`}>
            {parts.map((p, i) => (
              <span
                key={`p-${li}-${i}`}
                className={i % 2 === 1 ? boldClass : normalClass}
              >
                {p}
              </span>
            ))}
            {li < lines.length - 1 && <br />}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Variante só para mobile com as quebras pedidas e NEGRITO correto:
 * 1) "Cocción a Vapor que mejora"
 * 2) "hasta 2x¹ los resultados de la masa"
 * 3) "haciéndola mucho más crocante."
 *
 * Importante: o bold é reaplicado DENTRO de cada linha (não atravessa \n):
 * - L1: **mejora**
 * - L2: **hasta 2x** (¹ fora do bold)
 */
function forceMobileLines(original: string): string {
  if (!original) return original;

  // Remove ** temporariamente para evitar “vazamento” de bold entre linhas
  const noBold = original.replace(/\*\*/g, "");
  const txt = noBold.replace(/\s+/g, " ").trim();

  const re =
    /(Cocci[oó]n a Vapor que.*?mejora)(.*?hasta 2x[¹1]?)(.*?los resultados de la masa)(.*?haci[eé]ndola.*?crocante\.?)/i;

  let l1 = "", l2 = "", l3 = "";

  const m = txt.match(re);
  if (m) {
    l1 = (m[1] || "").trim(); // …mejora
    const hasta = (m[2] || "").trim(); // hasta 2x¹
    const resultados = (m[3] || "").trim(); // los resultados de la masa
    l2 = `${hasta} ${resultados}`.trim();
    l3 = (m[4] || "").trim(); // haciéndola…
  } else {
    // Fallback: força quebras em pontos previsíveis
    const simple = txt
      .replace(/(mejora)(\s+hasta\s+2x[¹1]?)/i, "$1\n$2")
      .replace(/(los resultados de la masa)(\s+)/i, "$1\n");

    const parts = simple.split("\n");
    l1 = (parts[0] ?? "").trim();
    l2 = (parts[1] ?? "").trim();
    l3 = (parts[2] ?? "").trim();
  }

  // Reaplica bold dentro de cada linha (não atravessa a quebra)
  l1 = l1.replace(/mejora/i, (s) => `**${s}**`);
  l2 = l2.replace(/(hasta 2x)([¹1]?)/i, (_m, a, sup) => `**${a}**${sup ?? ""}`);

  return `${l1}\n${l2}\n${l3}`.trim();
}

export default function ImageTextFeatureSection({
  section,
  backgroundColor = "#E51E49",
  title = "Nueva línea de cocinas Frigidaire\ncon **Tecnología VaporBake**",
  imageSrc,
  imageAlt = "",
  description =
    "Cocción a Vapor que **mejora hasta 2x**¹ los resultados de la masa haciéndola mucho más crocante.",
  /** se vier do admin, tem prioridade no mobile */
  descriptionMobile,
  leftPx = 960,
  rightPx = 540,
  textMaxPx = 475,
}: Props) {
  const id = useId();

  const {
    fullWidth,
    marginTopMobile = 0,
    marginBottomMobile = 0,
    marginTopDesktop,
    marginBottomDesktop,
  } = section ?? {};

  const inlineStyles: preact.JSX.CSSProperties = {
    marginTop: `${marginTopMobile}px`,
    marginBottom: `${marginBottomMobile}px`,
    ...(marginTopDesktop != null ? { marginTop: `${marginTopDesktop}px` } : {}),
    ...(marginBottomDesktop != null
      ? { marginBottom: `${marginBottomDesktop}px` }
      : {}),
    backgroundColor,
  };

  // Variante calculada p/ mobile (ou usa o campo do admin, se vier)
  const computedMobileDesc =
    descriptionMobile && descriptionMobile.trim().length > 0
      ? descriptionMobile
      : forceMobileLines(description);

  return (
    <Section id={id} style={inlineStyles} class="border-none">
      <Section.Container
        fullWidth={fullWidth}
        class="w-full md:px-14 bg-transparent border-none"
      >
        <div class="w-full max-w-[1500px] mx-auto">
          {/* Título topo */}
          <div class="w-full text-center pt-8 pb-6 md:pt-[5.5rem] md:pb-8">
            <h2 class="whitespace-pre-line text-white">
              <RichInline
                text={title}
                /* MOBILE: 22/42 | DESKTOP(>=md): 40/42 */
                normalClass="font-normal text-[22px] leading-[42px] md:text-[40px] md:leading-[42px]"
                boldClass="font-bold text-[22px] leading-[42px] md:text-[40px] md:leading-[42px]"
                style={{ fontFamily: "Gotham" }}
              />
            </h2>
          </div>

          {/* Card branco com imagem + texto */}
          <div class="w-full bg-white">
            <div
              class={[
                "grid items-center",
                "gap-6 md:gap-8",
                "md:grid-cols-1",
                "xl:[grid-template-columns:1.75fr_1fr]",
                `2xl:[grid-template-columns:${leftPx}px_${rightPx}px]`,
              ].join(" ")}
            >
              {/* Imagem esquerda */}
              <div class="w-full">
                {imageSrc
                  ? (
                    <img
                      src={imageSrc}
                      alt={imageAlt}
                      class="w-full h-auto block"
                      loading="lazy"
                      decoding="async"
                    />
                  )
                  : (
                    <div class="w-full aspect-[16/9] grid place-items-center border border-dashed">
                      <span class="text-sm">Adicione a imagem</span>
                    </div>
                  )}
              </div>

              {/* Texto direita */}
              <div class="w-full px-6 md:px-10 pb-5 md:pb-0">
                <div class="flex items-center justify-center text-center md:justify-start md:text-left min-h-full">
                  {/* MOBILE: versão com quebras forçadas e bold corrigido */}
                  <p
                    class="block md:hidden"
                    style={{ fontFamily: "Gotham", maxWidth: `${textMaxPx}px` }}
                  >
                    <RichInline
                      text={computedMobileDesc}
                      /* MOBILE: 18px sem leading fixo */
                      normalClass="font-normal text-[18px] text-[#E51E49]"
                      boldClass="font-bold text-[18px] text-[#E51E49]"
                    />
                  </p>

                  {/* DESKTOP: mantém o original do admin */}
                  <p
                    class="hidden md:block"
                    style={{ fontFamily: "Gotham", maxWidth: `${textMaxPx}px` }}
                  >
                    <RichInline
                      text={description}
                      /* DESKTOP(>=md): 32/38 */
                      normalClass="font-normal md:text-[32px] md:leading-[38px] text-[#E51E49]"
                      boldClass="font-bold md:text-[32px] md:leading-[38px] text-[#E51E49]"
                    />
                  </p>
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
    <div class="flex justify-center items-center h-[360px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
