import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader)
    return response.status(401).json({
      message: "Token missing",
    });

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "b87f06cf578295d8d644c2bec4264ab39e068308"
    ) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token!",
    });
  }
}
