import {
  deleteResource,
  getAllResource,
  putResource,
  postResource,
  getResource,
} from "./Http";

export default {
  register: (userData) => postResource("register", userData),
  authenticate: (credentials) => postResource("authenticate", credentials),
  my: () => getResource("my"),
  logout: () => getResource("logout"),
  update: (userId, userData) => putResource("users", userId, userData),
};
