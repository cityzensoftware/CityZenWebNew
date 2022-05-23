import UserDTO from "./login/UsetDTO";

type UserCookie = {
  jwt: string;
  userCourses: number[];
  userDTO: UserDTO;
};

export default UserCookie;
