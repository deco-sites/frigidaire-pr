import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @description Section title */
  title?: string;

  /** @description See all link */
  cta?: string;
}

function Header({ title, cta }: Props) {
  if (!title) return null;

  return (
    <div class={clx("flex justify-between items-center gap-2", "px-5 sm:px-0")}>
      <span class="text-2xl sm:text-3xl font-semibold">{title}</span>
      {cta && (
        <a class="text-sm font-medium text-primary" href={cta}>
          See all
        </a>
      )}
    </div>
  );
}

interface Tab {
  title: string;
}

function Tabbed({ children }: { children: JSX.Element }) {
  return <>{children}</>;
}

function Container({
  fullWidth,
  class: _class,
  ...props
}: JSX.IntrinsicElements["div"] & { fullWidth?: boolean }) {
  return (
    <div
      {...props}
      class={clx(
        "flex flex-col",
        fullWidth ? "w-full max-w-none px-0" : "w-full mx-auto sm:px-0",
        _class?.toString(),
      )}
    />
  );
}

function Placeholder({
  height,
  class: _class,
}: {
  height: string;
  class?: string;
}) {
  return (
    <div
      style={{
        height,
        containIntrinsicSize: height,
        contentVisibility: "auto",
      }}
      class={clx("flex justify-center items-center", _class)}
    >
      <span class="loading loading-spinner" />
    </div>
  );
}

function Section({
  children,
  classesContainer,
  fullWidth,
  class: _class,
  ...props
}: JSX.IntrinsicElements["section"] & {
  fullWidth?: boolean;
  classesContainer?: string;
}) {
  return (
    <section {...props} class={_class}>
      <Container fullWidth={fullWidth} class={classesContainer}>
        {children}
      </Container>
    </section>
  );
}

Section.Container = Container;
Section.Header = Header;
Section.Tabbed = Tabbed;
Section.Placeholder = Placeholder;

export default Section;
