import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { IronSessionBaseData } from "../../models/ironSession/IronSessionBaseData";
import { cookiesNames } from "../../utils/constants";

const getPassword = (): string => {
  const password = process.env.CITYZEN_SECURE_COOKIE_PASSWORD;

  if (!password) {
    throw new Error("Env variable CITYZEN_SECURE_COOKIE_PASSWORD is missing");
  }

  return password;
};
declare module "iron-session" {
  interface IronSessionData extends Partial<IronSessionBaseData> {}
}
export const sessionOptions = {
  password: getPassword(),
  cookieName: cookiesNames.user,
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
export type NextSsrRequest = GetServerSidePropsContext["req"];
