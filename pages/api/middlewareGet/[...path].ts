import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../helpers/http/withSession";

export default withIronSessionApiRoute(async function getRoute(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID;
  let pathFinal = "";
  const user = req.session.user;
  // const acceptedLanguage = "en_GB";
  const path: string[] = req.query.path as string[];
  if (path.length > 1) {
    path.forEach((element) => {
      pathFinal += "/" + element;
    });
  }

  try {
    if (user) {
      const requestOptions: RequestInit = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.jwt,
          credentials: "include",
          "Accept-Language": req.headers["accept-language"]
            ? req.headers["accept-language"]
            : "ro",
        },
      };
      const response = await fetch(baseUrl + pathFinal, requestOptions);
      // const user = await response.json();

      if (!response) {
        throw new Error("Successful login resulted in no user object");
      }

      res.json(await response.json());
      res.status(200);
      res.end();
      // await req.session.save();
      // res.send({ ok: true });
    } else {
      const requestOptions: RequestInit = {
        method: "GET",
        headers: {
          credentials: "include",
          "Accept-Language": req.headers["accept-language"]
            ? req.headers["accept-language"]
            : "ro",
        },
      };
      const response = await fetch(baseUrl + pathFinal, requestOptions);
      // const user = await response.json();

      if (!response) {
        throw new Error("Successful login resulted in no user object");
      }

      const responseText = await response.text();
      if (responseText) {
        res.json(JSON.parse(responseText));
      }
      res.status(200);
      res.end();
      // await req.session.save();
      // res.send({ ok: true });
    }
  } catch (error: any) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
}, sessionOptions);
