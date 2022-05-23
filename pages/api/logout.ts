import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../helpers/http/withSession";

export default withIronSessionApiRoute(async function logoutRoute(req, res) {
  return new Promise((resolve) => {
    req.session.destroy();
    res.status(200).end();
    resolve();
  });
}, sessionOptions);
