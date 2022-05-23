type UserDTO = {
  id: string;
  // personalTitles: PersonalTitles;
  firstName: string;
  lastName: string;
  email: string;
  userCourses: number[];
};

export default UserDTO;
export interface UserInclAccessToken extends UserDTO {
  jwt: string;
}
