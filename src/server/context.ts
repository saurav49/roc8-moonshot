import { db } from "~/server/db";
import jwt from "jsonwebtoken";

export const decodeAndVerifyJwtToken = (
  token: string,
): Promise<{ email: string }> => {
  return new Promise((resolve) => {
    jwt.verify(token, process.env.JWT_ACCESS_KEY ?? "", (_, user) => {
      if (user) {
        return resolve(user as { email: string });
      } else {
        return resolve({
          email: "",
        });
      }
    });
  });
};

export async function createTRPCContext({ headers }: { headers: Headers }) {
  const tokenWithBearer = headers.get("authorization");
  let token;
  if (tokenWithBearer && tokenWithBearer?.length > 0) {
    if (tokenWithBearer.split(" ").length > 0) {
      token = tokenWithBearer.split(" ")[1];
    }
  }
  async function getUserFromHeader(token: string | undefined) {
    if (!token || token === "undefined") {
      return null;
    }
    const user = await decodeAndVerifyJwtToken(token);
    if (!user || user.email.length === 0) {
      return null;
    }
    return user;
  }
  const user = await getUserFromHeader(token);
  return {
    db,
    headers,
    user,
  };
}
export type ContextTRPC = Awaited<ReturnType<typeof createTRPCContext>>;
