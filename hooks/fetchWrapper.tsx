import UserCookie from "../models/UserCookie";

export const fetchWrapper = {
  get: get,
  post: post,
  postObject: postObject,
  put: put,
  // delete: _delete,
};
const { NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID } = process.env;

// async function getToken() {
//   return localStorage.getItem('token');
// }

async function get(url: string) {
  //const token = await getToken();
  // const [cookieSs, setCookie] = useCookies(['user']);

  const requestOptions: RequestInit = {
    method: "GET",
    // mode: "cors",
    // credentials: "include",
    headers: {
      // Authorization: 'Bearer ' + token,
      "Accept-Language": "ro",
    },
  };
  const getResponse = await fetch(url, requestOptions);
  return getResponse;
}

async function post(url: string, body: Record<string, unknown>) {
  // const token = await getToken();

  const requestOptions: RequestInit = {
    method: "POST",
    credentials: "include",
    // mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      // Accept: "application/json",
    },
    body: JSON.stringify(body),
  };
  const postResponse = await fetch(url, requestOptions);
  return postResponse;
}
async function postObject(url: string, body: unknown) {
  //const token = await getToken();
  const requestOptions: RequestInit = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  };
  const postObjectReponse = await fetch(url, requestOptions);
  return postObjectReponse;
}

async function put(url: string, body: Record<string, unknown>) {
  //const token = await getToken();
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  };
  const putResponse = await fetch(
    NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID + url,
    requestOptions
  );
  return putResponse;
}

// prefixed with underscored because delete is a reserved word in javascript
// async function deleteReq(url: string) {
//   const requestOptions: RequestInit = {
//     method: "DELETE",
//   };
//   const deleteResponse = await fetch(
//     NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID + url,
//     requestOptions
//   );
//   return deleteResponse;
// }

// helper functions

// function handleResponse(response: any) {
//   return response.text().then((text: string) => {
//     const data = text && JSON.parse(text);

//     if (!response.ok) {
//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }

declare module "iron-session" {
  interface IronSessionData {
    user?: UserCookie;
  }
}
