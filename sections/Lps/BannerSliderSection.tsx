import BannerSlider from "site/islands/BannerSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";
import { DefaultBannerSection } from "site/configs/BannerSliderSection.ts";

/**
 * @description Seção com um slider de banners.
 */
interface Props {
  /** @title Configuração da Seção */
  section?: ISection;

  /** @title Banners */
  banners?: IResponsiveImage[];

  /** @title Configurações do Slider */
  configs?: ISliderConfigs;
}

export default function BannerSliderSection({
  section,
  banners = DefaultBannerSection.banners,
  configs,
}: Props) {
  const id = useId();

  const {
    marginTopMobile = 0,
    marginTopDesktop = 0,
    marginBottomMobile = 0,
    marginBottomDesktop = 0,
    fullWidth = false,
  } = section ?? {};

  const getClamp = (m: number, d: number) => `clamp(${m}px, 5vw, ${d}px)`;

  const inlineStyles = {
    marginTop: getClamp(marginTopMobile, marginTopDesktop),
    marginBottom: getClamp(marginBottomMobile, marginBottomDesktop),
  };

  const sliderConfig: ISliderConfigs = {
    ...configs,
    slidesPerView: configs?.slidesPerViewResponsive?.mobile ?? 1,
    breakpoints: {
      768: { slidesPerView: configs?.slidesPerViewResponsive?.tablet ?? 1 },
      1024: { slidesPerView: configs?.slidesPerViewResponsive?.desktop ?? 1 },
    },
  };

  if (!banners?.length) return null;

  // 🚫 Não force heightMobile/widthMobile aqui.
  const safeBanners = banners;

  return (
    <Section id={id} style={inlineStyles} class="border-none">
      <Section.Container
        fullWidth={fullWidth}
        class="banner-slider-section border-none bg-transparent"
      >
        <BannerSlider
          configs={sliderConfig}
          rootId={id}
          banners={safeBanners}
        />
      </Section.Container>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[420px] lg:h-[440px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
