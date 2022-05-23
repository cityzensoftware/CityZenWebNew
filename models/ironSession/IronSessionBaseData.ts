import { UserInclAccessToken } from "../login/UserDTO";
import Referrers from "./Referrers";

export interface IronSessionBaseData {
  user: UserInclAccessToken;
  referrers: Referrers;
}
