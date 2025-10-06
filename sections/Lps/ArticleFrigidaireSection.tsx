/** @title Seção Frigidaire de Cards com Imagem, Título e Texto */
import { useId } from "site/sdk/useId.ts";
import Section from "site/components/ui/Section.tsx";
import type { ISection } from "site/types/Section.d.ts";

export interface CardItem {
  image: {
    src: string;
    alt?: string;
  };
  title: string;
  description: string;
}

export interface Props {
  section?: ISection;
  heading?: string;
  subtitle?: string;
  cards?: CardItem[];
}

export default function ArticleFrigidaireSection({
  section,
  heading = "Título da seção",
  subtitle,
  cards = [],
}: Props) {
  const id = useId();
  const titleHtml = section?.title ?? heading;
  const subtitleHtml = section?.subtitle ?? subtitle;

  if (!cards.length && !(titleHtml || subtitleHtml)) return null;

  return (
    <Section
      {...section}
      id={id}
      classesContainer="mt-5 mb-5 article-frigidaire-section"
    >
      {(titleHtml || subtitleHtml) && (
        <div class="max-w-[1600px] mx-auto px-4 mb-6 text-center">
          {titleHtml && (
            <h2
              class="text-2xl lg:text-3xl font-semibold text-[#000000]"
              style={{ fontFamily: "'Gotham', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: titleHtml }}
            />
          )}

          {subtitleHtml && (
            <div
              class="mt-2 text-base lg:text-lg text-[#4F4F4F]"
              style={{ fontFamily: "'Gotham', sans-serif" }}
              dangerouslySetInnerHTML={{ __html: subtitleHtml }}
            />
          )}
        </div>
      )}

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto px-4">
        {cards.map((card, index) => (
          <div key={index} class="flex flex-col items-center text-center">
            <img
              src={card.image.src}
              alt={card.image.alt || "Imagem"}
              class="rounded-md mb-4 w-full h-auto object-cover"
              loading="lazy"
            />

            <h3
              class="text-xl font-bold text-[#000000] mb-2"
              style={{ fontFamily: "'Gotham', sans-serif" }}
            >
              {card.title}
            </h3>

            <p
              class="text-sm text-[#4F4F4F]"
              style={{ fontFamily: "'Gotham', sans-serif" }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[240px] lg:h-[320px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
