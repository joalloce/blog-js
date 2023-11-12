import axios from "axios";

const Http = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_URL,
  timeout: 10000,
});

// Http.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

const handleApiError = (request, resourceName, error) => {
  const newError = new Error(`Error ${request} ${resourceName}`);
  newError.data = error.response;
  throw newError;
};

export const getAllResource = (resourceName, params) => {
  const urlParams = new URLSearchParams(params);
  console.log("getAll", resourceName, "" + urlParams);
  return Http.get(`/${resourceName}/` + "?" + urlParams)
    .then((response) => response.data.data)
    .catch((error) => handleApiError("getAll", resourceName, error));
};

export const postResource = (resourceName, data) => {
  console.log("post", resourceName, data);
  return Http.post(`/${resourceName}`, data)
    .then((response) => response.data)
    .catch((error) => handleApiError("post", resourceName, error));
};

export const putResource = (resourceName, resourceId, data) => {
  console.log("put", resourceName, resourceId, data);
  return Http.put(`/${resourceName}/${resourceId}`, data)
    .then((response) => response.data.data)
    .catch((error) => handleApiError("put", resourceName, error));
};

export const getResource = (resourceName, resourceId = "") => {
  console.log("get", resourceName, resourceId);
  return Http.get(`/${resourceName}/${resourceId}`)
    .then((response) => response.data.data)
    .catch((error) => handleApiError("get", resourceName, error));
};

export const deleteResource = (resourceName, resourceId) => {
  console.log("delete", resourceName, resourceId);
  return Http.delete(`/${resourceName}/${resourceId}`)
    .then((response) => response.data)
    .catch((error) => handleApiError("delete", resourceName, error));
};
