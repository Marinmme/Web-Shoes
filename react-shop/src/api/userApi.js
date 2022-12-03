import axiosClient from "./axiosClient";

class UserApi {

  registerUser = (user) => {
    const url = `api/user/signup`;
    return axiosClient.post(url, user);
  };

  loginUser = (user) => {
    const url = `api/user/login`;
    return axiosClient.post(url, user);
  };

  updateUser = (id, user) => {
    const url = `api/user/updateInfo?id=${id}`;
    return axiosClient.post(url, user);
  };

  changePass = (id, pass) => {
    const url = `api/user/changePass?id=${id}`;
    return axiosClient.post(url, pass);
  };

}
const userApi = new UserApi();
export default userApi;
