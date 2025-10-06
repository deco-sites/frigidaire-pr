import { Picture } from "apps/website/components/Picture.tsx";
import type { IResponsiveImage } from "site/types/ResponsiveImage.d.ts";
import type { JSX } from "preact";

type Extra = {
  imgClass?: string;
  wrapperClass?: string;
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  objectPosition?: string;
};

export default function ResponsiveImage(
  {
    src,
    alt,
    link,
    sizes,
    loadingOptions,
    imgClass = "",
    wrapperClass = "",
    fit,
    objectPosition,
  }: IResponsiveImage & Extra,
): JSX.Element | null {
  const {
    fullScreen = false,
    width, // desktop width (opcional) — não enviaremos height
    // _height,      // se quiser manter no objeto, prefixe com _ para evitar lint
    widthMobile, // mobile width (opcional)
    maxWidth = "unset",
    maxHeight = "unset",
  } = sizes ?? {};

  const {
    preload = false,
    loading = "lazy",
    fetchPriority = "low",
  } = loadingOptions ?? {};

  const { desktop, mobile } = src ?? {};
  if (!desktop && !mobile) return null;

  const fitClass = fit === "contain"
    ? "object-contain"
    : fit === "fill"
    ? "object-fill"
    : fit === "none"
    ? "object-none"
    : fit === "scale-down"
    ? "object-scale-down"
    : "object-cover";

  const pictureClass = [
    "relative",
    "block",
    "w-full",
    "max-w-[100vw]",
    fullScreen ? "w-screen max-w-none" : "",
    wrapperClass,
  ].filter(Boolean).join(" ");

  const imgClasses = [
    "block",
    "w-full",
    fit ? "h-full" : "h-auto", // sem fit => sem cortes
    fit ? fitClass : "",
    imgClass,
  ].filter(Boolean).join(" ");

  const hasDesktop = Boolean(desktop);
  const hasMobile = Boolean(mobile);

  // Monta os <source> nativos com srcset (sem height)
  // Envie apenas width quando quiser pedir redimensionamento ao CDN.
  const desktopSourceAttrs: preact.JSX.HTMLAttributes<HTMLSourceElement> = {
    media: "(min-width: 769px)",
    srcset: hasDesktop ? desktop! : undefined,
    ...(Number.isFinite(width) ? { width: width as number } : {}),
  };

  const mobileSourceAttrs: preact.JSX.HTMLAttributes<HTMLSourceElement> = {
    media: "(max-width: 768px)",
    srcset: hasMobile ? mobile! : undefined,
    ...(Number.isFinite(widthMobile) ? { width: widthMobile as number } : {}),
  };

  const pictureEl = (
    <Picture class={pictureClass} preload={preload}>
      {hasDesktop && <source {...desktopSourceAttrs} />}
      {hasMobile && <source {...mobileSourceAttrs} />}

      {/* Fallback: desktop se existir, senão mobile */}
      <img
        alt={alt ?? ""}
        class={imgClasses}
        loading={loading}
        decoding="async"
        src={hasDesktop ? desktop! : mobile!}
        style={{
          maxWidth,
          maxHeight,
          ...(fit && objectPosition ? { objectPosition } : {}),
        }}
        {...{ fetchPriority }}
      />
    </Picture>
  );

  if (!link?.href) return pictureEl;

  const { href, title, target = "blank" } = link ?? {};
  return (
    <a
      href={href}
      title={title ?? ""}
      target={`_${target}`}
      rel={target === "blank" ? "noopener noreferrer" : ""}
      class="flex no-underline w-full"
    >
      {pictureEl}
    </a>
  );
}
