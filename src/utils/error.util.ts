import type { BaseError } from "@types";
import { json_util } from "./json.util";
import { debug_util } from "./debug.util";

interface ErrorUtilResponse {
  format(value: string | object | undefined, baseResponse: string): string | object;
}

export const error_util: () => ErrorUtilResponse = () => {
  const { consoleDebug } = debug_util(null);

  return {
    format: (value, baseResponse) => {
      consoleDebug(`${value}`);

      const { isValidJson } = json_util()

      const conditional: Record<string, (value: unknown) => string | object> = {
        string: value => {
          const typedValue = value as string;
          
          consoleDebug(typeof typedValue);
          consoleDebug(`${isValidJson(typedValue)}`);

          if (isValidJson(typedValue)) return JSON.parse(typedValue);
          
          return typedValue;
        },
        object: value => {
          const error = value as BaseError;

          return error?.message ?? baseResponse;
        }
      };

      consoleDebug(typeof value);
      consoleDebug(`${conditional?.[typeof value]}`);

      if (conditional?.[typeof value]) return conditional[typeof value](value);

      return baseResponse;
    }
  };
};
