import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  void next;
  console.error(err);
  const message = err instanceof Error ? err.message : "Internal server error.";

  res.status(500).json({
    success: false,
    message,
  });
}
