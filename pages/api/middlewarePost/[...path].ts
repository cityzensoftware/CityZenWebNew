import { withIronSessionApiRoute } from "iron-session/next";
import { getAuthHeaders } from "../../../helpers/authHelpers";
import { sessionOptions } from "../../../helpers/http/withSession";

export default withIronSessionApiRoute(async function getRoute(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID;
  let pathFinal = "";

  const needsAuthProp: boolean = JSON.parse(req.query.needsAuth as string);
  const { needsAuth, ...otherQueryParams } = req.query;
  req.query = { ...otherQueryParams };

  const path: string[] = req.query.path as string[];
  if (path.length > 1) {
    path.forEach((element) => {
      pathFinal += "/" + element;
    });
  }

  try {
    const requestHeaders: HeadersInit = new Headers(
      needsAuthProp ? getAuthHeaders(req) : undefined
    );
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set(
      "Accept-Language",
      req.headers["accept-language"] ? req.headers["accept-language"] : "ro"
    );
    // requestHeaders.set("Accept", "application/json");
    // const response = await fetchWrapper.post(baseUrl + pathFinal, req.body);
    // const user = await response.json();
    const requestOptions: RequestInit = {
      method: "POST",
      // credentials: "include",
      // mode: 'cors',
      headers: requestHeaders,
      body: JSON.stringify(req.body),
    };

    const response = await fetch(baseUrl + pathFinal, requestOptions);

    if (!response) {
      throw new Error("Successful login resulted in no user object");
    }
    const dataJson = await response.text();
    let data: any | null = null;
    if (dataJson) {
      data = JSON.parse(dataJson) as any;
      res.json(dataJson);
      return data;
    }

    res.status(200);
    res.end();
    // await req.session.save();
    // res.send({ ok: true });
  } catch (error: any) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
}, sessionOptions);
