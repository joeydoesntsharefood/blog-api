import type { BaseUtil } from "@types";

export interface ResponseDebugUtil {
  inDebugMode(): boolean;
  consoleDebug(value: string): void;
}

export const debug_util: BaseUtil<boolean | null, ResponseDebugUtil> = (value) => {
  let conditional = false;
  
  if (value) conditional = Boolean(process.env.DEBUG) || false;

  return {
    inDebugMode: () => conditional,
    consoleDebug: value => {
      if (conditional) console.log(value);
    }
  }
};
