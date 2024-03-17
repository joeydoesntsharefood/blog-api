import type { BaseMiddleware } from "@types";

export const log_middleware: BaseMiddleware = (req, _, next) => {
  const inDebugMode = Boolean
  
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
};
