import { NextApiRequest } from "next";
import { authorizationHeaderName } from "./apiConstants";

export const getAuthHeaders = (req: NextApiRequest) => {
  const user = req.session.user;

  if (!user) {
    throw new Error(
      "Trying to retrieve the accessToken, but no navigating user found in cookie"
    );
  }

  const headers: HeadersInit = {
    [authorizationHeaderName]: `Bearer ${user.jwt}`,
  };
  return headers;
};
