// sections/Lps/SafetyGratesShowcaseSection.tsx
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

/**
 * @title Vitrine de Seguridad de Parrillas
 * @description Sección con título, dos tarjetas (imagen + panel blanco con textos e imagen de porcentaje), CTA y texto legal.
 */
export interface Card {
  /** @title Imagen principal (lado izquierdo) */
  imageSrc: string;
  /** @title ALT de la imagen principal */
  imageAlt?: string;
  /** @title Título (ej.: Parrilla de alambrón) */
  title: string;
  /** @title Imagen del porcentaje (número grande en rojo) */
  numberImageSrc: string;
  /** @title ALT de la imagen del porcentaje */
  numberImageAlt?: string;
  /** @title Subtítulo (ej.: más estables) */
  subtitle?: string;
}

export interface Props {
  section?: ISection;
  anchorId?: string;

  /** @default ¡Cocinar nunca ha sido más seguro! */
  titleLine1?: string;
  /** @default Diseño superior con 8 puntos de apoyo */
  titleLine2?: string;

  /** @title Cartas (2 itens) */
  cards: Card[];

  /** @default Más practicidad, tecnología e innovación. */
  midTitleBold?: string;
  /** @default Explora nuevas técnicas culinarias\ny sorprende a todos. */
  midTitleRegular?: string;

  button?: {
    /** @default ¡DESCUBRE MÁS! */
    label?: string;
    href?: string;
    /** @default false */
    newTab?: boolean;
  };

  /** @title Texto legal (rodapé) */
  legalText?: string;
}

export default function SafetyGratesShowcaseSection({
  anchorId,
  titleLine1 = "¡Cocinar nunca ha sido más seguro!",
  titleLine2 = "Diseño superior con 8 puntos de apoyo",
  cards = [
    {
      imageSrc: "",
      imageAlt: "Parrilla alambrón",
      title: "Parrilla de alambrón",
      numberImageSrc: "",
      numberImageAlt: "14%",
      subtitle: "más estables",
    },
    {
      imageSrc: "",
      imageAlt: "Parrilla de hierro fundido",
      title: "Parrilla de hierro fundido",
      numberImageSrc: "",
      numberImageAlt: "63%",
      subtitle: "más estables",
    },
  ],
  midTitleBold = "Más practicidad, tecnología e innovación.",
  midTitleRegular = "Explora nuevas técnicas culinarias\ny sorprende a todos.",
  button = { label: "¡DESCUBRE MÁS!", href: "#", newTab: false },
  legalText,
}: Props) {
  // quebra linha depois de "Parrilla de"
  const renderTitle = (title: string) => {
    const re = /^(Parrilla\s+de)\s+/i;
    const m = title.match(re);
    if (m) {
      const rest = title.replace(re, "");
      return (
        <>
          {m[1]}
          <br />
          {rest}
        </>
      );
    }
    return <>{title}</>;
  };

  return (
    <Section id={anchorId?.replace(/^#/, "")} class="w-full">
      <div class="px-4 md:px-14 py-10 md:py-14 bg-[#E51E49]">
        {/* Título principal */}
        <div class="text-center font-gotham text-white px-8 md:px-0">
          {/* MOBILE: 22/normal | DESKTOP: 38/42 */}
          <h2 class="font-bold text-[22px] leading-normal md:text-[38px] md:leading-[42px] tracking-[0]">
            {titleLine1}
          </h2>
          <p class="mt-2 font-bold text-[22px] leading-normal md:text-[38px] md:leading-[42px] tracking-[0]">
            {titleLine2}
          </p>
        </div>

        {/* Cartas */}
        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <article
              key={`card-${idx}`}
              class="bg-white shadow-sm overflow-hidden"
            >
              <div class="grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr]">
                {/* imagen izquierda */}
                <div class="relative">
                  {card.imageSrc
                    ? (
                      <img
                        src={card.imageSrc}
                        alt={card.imageAlt ?? ""}
                        class="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )
                    : <div class="aspect-[16/9] bg-black/5" />}
                </div>

                {/* panel blanco derecho */}
                <div class="flex flex-col justify-center items-center gap-2 p-4 sm:p-6 bg-white">
                  <h3 class="text-center font-gotham font-bold text-[24px] leading-[28px] text-black">
                    {/* MOBILE: sem quebras */}
                    <span class="inline md:hidden whitespace-nowrap overflow-hidden text-ellipsis">
                      {String(card.title)
                        .replace(/<br\s*\/?>/gi, " ")
                        .replace(/(\r\n|\n|\r)/g, " ")}
                    </span>

                    {/* DESKTOP: original (pode quebrar) */}
                    <span class="hidden md:inline">
                      {renderTitle(card.title)}
                    </span>
                  </h3>

                  {(card.numberImageSrc || card.subtitle) && (
                    <div class="flex flex-row items-center justify-center gap-2 md:flex-col">
                      {card.numberImageSrc && (
                        <img
                          src={card.numberImageSrc}
                          alt={card.numberImageAlt ?? ""}
                          class="w-[85px] h-auto"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      {card.subtitle && (
                        <p class="text-center font-gotham font-normal text-[20px] leading-normal md:leading-[42px] text-[#E51E49]">
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Título intermediário */}
        <div class="mt-10 text-center font-gotham text-white">
          {/* MOBILE: 22/normal | DESKTOP: 38/42 */}
          <h3 class="font-bold text-[22px] leading-normal md:text-[38px] md:leading-[42px]">
            {midTitleBold}
          </h3>
          {/* MOBILE: 22/normal e sem whitespace-pre-line | DESKTOP: 38/42 com whitespace-pre-line */}
          <p class="mt-2 font-normal text-[22px] md:text-[38px] leading-normal md:leading-[42px] whitespace-normal md:whitespace-pre-line">
            {midTitleRegular}
          </p>
        </div>

        {/* CTA */}
        {button?.label && button?.href && (
          <div class="mt-6 flex justify-center md:mt-[4.5rem] md:mb-[7.5rem]">
            <a
              href={button.href}
              target={button.newTab ? "_blank" : undefined}
              rel={button.newTab ? "noopener noreferrer" : undefined}
              class="inline-flex items-center justify-center rounded-full bg-black text-white px-8 md:px-10 py-2 md:py-3 font-gotham font-bold uppercase text-[24px] md:text-[32px] leading-[36px] md:leading-[48px] tracking-[0] hover:opacity-90 transition"
              aria-label={button.label}
            >
              {button.label}
            </a>
          </div>
        )}

        {/* Legal */}
        {legalText && (
          <div class="mt-8">
            <p class="text-[12px] leading-[14px] text-justify font-gotham font-normal text-white opacity-90">
              {legalText}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
