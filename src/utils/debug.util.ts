import type { BaseUtil } from "@types";

export const debug_util: BaseUtil<null, { inDebugMode(): boolean }> = () => {
  return {
    inDebugMode: () => Boolean(process.env.DEBUG) || false,
  }
}