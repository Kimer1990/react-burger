import { deleteCookie, getCookie, setCookie } from "./cookie-helper";

const apiUrl = "https://norma.nomoreparties.space/api";

type THeader = Record<string, string>;

const makeRequest = async (url: string, options: any = {}) => {
  const response = await fetch(url, options);
  try {
    if (response.ok) {
      return response.json();
    } else {
      console.log("error triggered");
      return response.json().then((error) => Promise.reject(error));
    }
  } catch (error) {
    console.log("error triggered");
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }
};

export const getData = async (url: string) => {
  return makeRequest(`${apiUrl}/${url}`);
};

export const getDataWithToken = async (url: string) => {
  const options = {
    method: "GET",
    headers: getHeaders(),
  };

  try {
    return await makeRequest(`${apiUrl}/${url}`, options);
  } catch (error: any) {
    console.log("error triggered");
    return checkToken(error, url, options);
  }
};

export const postData = async (url: string, data: any) => {
  const options = {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  };
  try {
    return makeRequest(`${apiUrl}/${url}`, options);
  } catch (error: any) {
    console.log("error triggered");
    return checkToken(error, url, options);
  }
};

export const patchData = async (url: string, data: any) => {
  const options = {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  };

  try {
    return makeRequest(`${apiUrl}/${url}`, options);
  } catch (error: any) {
    console.log("error triggered");
    return checkToken(error, url, options);
  }
};

const getHeaders = () => {
  const headers: THeader = { "Content-Type": "application/json;charset=utf-8" };
  if (getCookie("accessToken")) {
    headers.Authorization = `Bearer ${getCookie("accessToken")}`;
  }
  return headers;
};

const checkToken = async (
  error: { message: string },
  url: string,
  options: any
) => {
  if (error.message === "jwt expired") {
    console.log("checkToken triggered");
    const { refreshToken, accessToken } = await refreshTokenRequest();
    saveTokens(refreshToken, accessToken);

    options.headers.Authorization = `Bearer ${accessToken}`;
    return makeRequest(`${apiUrl}/${url}`, options);
  } else {
    return Promise.reject(error);
  }
};

export const refreshTokenRequest = () => {
  console.log("refreshToken triggered");
  return postData("auth/token", {
    token: localStorage.getItem("refreshToken"),
  });
};

export const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie("accessToken", accessToken.split("Bearer ")[1]);
  localStorage.setItem("refreshToken", refreshToken);
};

export const logOut = async () => {
  const response = await postData("auth/logout", {
    token: localStorage.getItem("refreshToken"),
  });
  if (response.success) {
    localStorage.removeItem("refreshToken");
    deleteCookie("accessToken");
  }
};
