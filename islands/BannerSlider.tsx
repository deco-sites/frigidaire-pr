import Slider from "site/components/ui/Slider.tsx";
import ResponsiveImage from "site/components/ui/ResponsiveImage.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

type Props = {
  banners?: IResponsiveImage[];
  configs?: ISliderConfigs;
  rootId: string;
};

export default function Island({ banners = [], configs = {}, rootId }: Props) {
  const autoplayDelay = configs?.autoplay?.delay;
  const infinite = configs?.loop ?? false;

  return (
    <div
      id={rootId}
      class="relative w-full max-w-[100vw] mx-auto overflow-x-hidden overflow-y-visible"
    >
      <Slider class="
          flex gap-0 snap-x snap-mandatory
          overflow-x-hidden overflow-y-visible
          max-w-[100vw]

          /* evita qualquer largura > viewport */
          [&_picture]:max-w-[100vw]
          [&_img]:max-w-[100vw]

          /* altura natural em tudo */
          [&_li[data-slider-item]]:h-auto
          [&_picture]:block
          [&_img]:block [&_img]:w-full [&_img]:h-auto
          /* mostra a arte inteira (sem cortes) em qualquer breakpoint */
          [&_img]:!object-contain
        ">
        {banners.map((props: IResponsiveImage, idx: number) => (
          <Slider.Item
            index={idx}
            key={idx}
            class="snap-start min-w-full h-auto"
          >
            <ResponsiveImage {...props} alt={props.alt || "Banner"} />
          </Slider.Item>
        ))}
      </Slider>

      <Slider.JS
        rootId={rootId}
        scroll="smooth"
        interval={autoplayDelay}
        infinite={infinite}
      />
    </div>
  );
}
