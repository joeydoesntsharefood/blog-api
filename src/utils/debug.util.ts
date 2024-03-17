import type { BaseUtil } from "@types";

export const debug_util: BaseUtil<undefined, boolean> = () => {
  return Boolean(process.env.DEBUG) || false;
}