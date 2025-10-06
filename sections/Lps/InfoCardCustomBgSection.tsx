import CustomInfoCardSlider from "site/islands/CustomInfoCardSlider.tsx";
import Section from "site/components/ui/Section.tsx";
import { useId } from "site/sdk/useId.ts";
import type { IInfoCardCustom } from "site/types/InfoCardCustom.d.ts";
import type { ISection } from "site/types/Section.d.ts";
import type { ISliderConfigs } from "site/types/Slider.d.ts";

/**
 * @title InfoCard com Background Personalizável
 * @description Seção com controle total de layout e fonte do InfoCard.
 */
interface Props {
  section?: ISection;
  infoCards?: IInfoCardCustom[];
  configs?: ISliderConfigs;
}

export default function InfoCardCustomBgSection({
  section,
  infoCards,
  configs,
}: Props) {
  const id = useId();

  if (!infoCards?.length) return null;

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
    ...(marginTopDesktop && { marginTop: `${marginTopDesktop}px` }),
    ...(marginBottomDesktop && { marginBottom: `${marginBottomDesktop}px` }),
  };

  return (
    <Section
      id={id}
      style={inlineStyles}
      class="border-none bg-transparent"
    >
      <Section.Container
        fullWidth={fullWidth}
        class="w-full max-w-none px-0 border-none bg-transparent"
      >
        <CustomInfoCardSlider
          rootId={id}
          infoCards={infoCards}
          configs={configs}
        />
      </Section.Container>
    </Section>
  );
}

export function LoadingFallback() {
  return (
    <div class="flex justify-center items-center h-[570px] lg:h-[500px]">
      <span class="loading loading-spinner" />
    </div>
  );
}
