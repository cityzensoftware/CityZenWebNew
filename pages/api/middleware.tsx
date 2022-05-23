export const middleware = {
  get: get,
  post: post,
  postObject: postObject,
  put: put,
  // delete: _delete,
};
const { NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID } = process.env;

async function getToken() {
  return localStorage.getItem("token");
}

async function get(url: string) {
  const token = await getToken();
  // const [cookieSs, setCookie] = useCookies(['user']);

  const requestOptions: RequestInit = {
    method: "GET",
    // mode: "cors",
    // credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const getResponse = await fetch(
    NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID + url,
    requestOptions
  );
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
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  };
  const postResponse = await fetch(url, requestOptions);
  return postResponse;
}
async function postObject(url: string, body: unknown) {
  const token = await getToken();
  const requestOptions: RequestInit = {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  };
  const postObjectResponse = await fetch(
    NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID + url,
    requestOptions
  );
  return postObjectResponse;
}

async function put(url: string, body: Record<string, unknown>) {
  const token = await getToken();
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
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
// async function _delete(url: string) {
//   const requestOptions: RequestInit = {
//     method: "DELETE",
//   };
//   return await fetch(NEXT_PUBLIC_APP_GOOGLE_CLIENT_ID + url, requestOptions);
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
