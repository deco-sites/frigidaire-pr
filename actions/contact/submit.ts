import { logger } from "@deco/deco/o11y";
import { type AppContext } from "../../apps/deco/records.ts";
import { contact } from "../../db/schema.ts";
import { SubmitContactFormProps, Success } from "../../packs/types.ts";

export type Props = SubmitContactFormProps;

export default async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Success> {
  const records = await ctx.invoke.records.loaders.drizzle();

  try {
    // @ts-ignore error in node
    await records.insert(contact).values({
      ...props,
      date: new Date().toISOString(),
    });
    return {
      success: true,
    };
  } catch (e) {
    logger.error(e);
    return {
      success: false,
      message: e,
    };
  }
}
