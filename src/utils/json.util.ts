import { parseJsonText } from "typescript";

interface JsonUtilResponse {
  isValidJson(value?: string): boolean;
}


export const json_util: () => JsonUtilResponse = () => {
  return {
    isValidJson: value => {
      if (!value) return false;

      try {
        JSON.parse(value);

        return true;
      } catch(_: unknown) {
        return false;
      }
    }
  }
}