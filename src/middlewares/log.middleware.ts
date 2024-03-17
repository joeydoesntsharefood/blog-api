import type { BaseMiddleware } from "@types";
import { debug_util } from "@utils";

export const log_middleware: BaseMiddleware = (req, _, next) => {
  const { inDebugMode } = debug_util(null);
  
  if (inDebugMode())
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  next();
};
