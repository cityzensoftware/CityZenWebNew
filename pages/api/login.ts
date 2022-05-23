import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../helpers/http/withSession";
import { fetchWrapper } from "../../hooks/fetchWrapper";
import UserCookie from "../../models/UserCookie";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID;

  try {
    const response = await fetchWrapper.post(
      baseUrl + "/Authentication/login-json",
      req.body
    );
    const user = (await response.json()) as UserCookie;

    if (!req.session) {
      throw new Error("Successful login resulted in no user object");
    }
    req.session.user = user;
    await req.session.save();

    const { jwt, ...userProps } = user;
    const userWithoutAccessToken = { ...userProps };
    await req.session.save();
    res.json(userWithoutAccessToken);
    res.status(200);
    res.end();
    // await req.session.save();
    // res.send({ ok: true });
  } catch (error: any) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
}, sessionOptions);
