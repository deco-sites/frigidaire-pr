// site/islands/ToggleLegalTerms.tsx
import { useEffect, useRef, useState } from "preact/hooks";

export type ToggleLegalTermsProps = {
  title?: string;
  terms: string;
  defaultOpen?: boolean;
  anchorId?: string;
};

function Paragraphs({ text }: { text: string }) {
  return (
    <div
      class="
        space-y-3
        text-[#222]
        text-[11px] leading-[16px]
        md:text-[11px] md:leading-[16px]
      "
      style={{ fontFamily: "Gotham" }}
    >
      {text.split(/\r?\n/).map((line, i) =>
        line.trim() === "" ? <div key={i} class="h-2" /> : <p key={i}>{line}</p>
      )}
    </div>
  );
}

export default function ToggleLegalTerms({
  title = "TÉRMINOS Y CONDICIONES LEGALES “MES FRIGIDAIRE GUATEMALA”",
  terms,
  defaultOpen = false,
  anchorId,
}: ToggleLegalTermsProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  // animação de altura
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.style.maxHeight = open ? `${el.scrollHeight}px` : "0px";
  }, [open]);

  // âncora opcional
  useEffect(() => {
    if (anchorId && defaultOpen) {
      requestAnimationFrame(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []); // intencional

  return (
    <div id={anchorId} class="w-full mx-auto px-4">
      {/* Cabeçalho centralizado (sem border-y) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="legal-terms"
        class="w-full flex items-center justify-center py-5"
      >
        {/* Bloco texto + seta centralizados */}
        <span
          class="
            inline-flex items-center justify-center gap-2
            text-center
            font-medium
            text-[12px] leading-[18px]
            md:text-[14px] md:leading-[20px]
            underline decoration-1 underline-offset-[2px]
            text-[#041E50]
          "
          style={{ fontFamily: "Gotham" }}
        >
          <span class="align-middle">{title}</span>

          {/* Seta alinhada ao texto */}
          <svg
            class={`w-4 h-4 align-middle transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
          </svg>
        </span>
      </button>

      {/* Conteúdo colapsável */}
      <div
        id="legal-terms"
        ref={contentRef}
        class="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: defaultOpen ? "9999px" : "0px" }}
      >
        <div class="py-6">
          <Paragraphs text={terms} />
        </div>
      </div>
    </div>
  );
}
