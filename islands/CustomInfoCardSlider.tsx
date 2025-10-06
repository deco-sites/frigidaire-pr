import Slider from "site/components/ui/Slider.tsx";
import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

interface Props {
  infoCards?: IInfoCardCustom[];
  rootId: string;
  configs?: ISliderConfigs;
}

export default function CustomInfoCardSlider({
  infoCards = [],
  rootId,
  configs = {},
}: Props) {
  if (!infoCards.length) return null;

  return (
    <div id={rootId} class="w-full overflow-hidden">
      <Slider class="flex gap-0 overflow-hidden snap-x snap-mandatory">
        {infoCards.map((card, index) => {
          const isLeft = card?.direction === "left";

          return (
            <Slider.Item
              index={index}
              key={index}
              class="snap-start min-w-full h-auto lg:h-[500px]"
            >
              <div
                class={`w-full h-full items-center justify-between flex ${
                  isLeft
                    ? "flex-col lg:flex-row"
                    : "flex-col lg:flex-row-reverse"
                }`}
              >
                {/* Mídia */}
                <div class="w-full lg:w-1/2 h-full flex items-stretch">
                  <div class="w-full h-full flex justify-center items-center">
                    {card?.typeOfContent &&
                        "src" in card.typeOfContent &&
                        card.typeOfContent.src.endsWith(".mp4")
                      ? (
                        <video
                          src={card.typeOfContent.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          class="w-full h-full object-cover bg-transparent"
                        />
                      )
                      : card?.typeOfContent &&
                          "srcDesktop" in card.typeOfContent
                      ? (
                        <img
                          src={card.typeOfContent.srcDesktop}
                          alt={card.typeOfContent.alt ?? "Imagem"}
                          class="w-full h-full object-cover"
                        />
                      )
                      : null}
                  </div>
                </div>

                {/* Texto */}
                <div
                  class="w-full lg:w-1/2 h-full p-6 lg:p-10 flex flex-col justify-center"
                  style={{
                    backgroundColor: card?.textBackgroundColor ?? "#000000",
                    color: card?.textColor ?? "#FFFFFF",
                    fontFamily: card?.fontFamily ?? "Arial",
                  }}
                >
                  {card?.title && (
                    <h2
                      class="mb-4 uppercase font-bold text-[12px] leading-[16px] sm:text-[14px] sm:leading-[20px] md:text-[34px] md:leading-[48px]"
                      dangerouslySetInnerHTML={{ __html: card.title }}
                    />
                  )}

                  {card?.description && (
                    <p
                      class="text-[12px] leading-[18px] md:text-[16px] md:leading-[20px] font-normal"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                  )}

                  {card?.link?.href && (
                    <div class="mt-6">
                      <a
                        href={card.link.href}
                        class="inline-block bg-white text-black px-6 py-2 rounded font-semibold hover:opacity-80 transition"
                      >
                        {card.link.text ?? "Saiba mais"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Slider.Item>
          );
        })}
      </Slider>

      <Slider.JS
        rootId={rootId}
        scroll="smooth"
        interval={configs?.autoplay?.delay}
        infinite={configs?.loop}
        speed={configs?.speed}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              #${rootId} h2 span {
                font-size: 16px !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}
