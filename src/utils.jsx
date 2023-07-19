import { redirect } from "react-router-dom";
import api, { apiPrivate } from "./server/api";

export async function requireAuth(request) {
  const path = new URL(request.url).pathname;
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  console.log(isLoggedIn, request, path, "requireAuth");

  if (!isLoggedIn) {
    throw redirect(`/login?message=You must log in first!&redirectTo=${path}`);
  }
  return null;
}

export async function refresh() {
  const response = await apiPrivate.get("/refresh", {
    withCredentials: true,
  });
  console.log(response, response.data);
  return response.data.accessToken;
}

export const reqInter = (acsTkn) => {
  const requestIntercept = apiPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${acsTkn}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  return requestIntercept
}

export const resInter = () => {
  const responseIntercept = apiPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
  return responseIntercept
}

// export const getUser = async (acsTkn) => {
//   const requestIntercept = apiPrivate.interceptors.request.use(
//     (config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${acsTkn}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   const responseIntercept = apiPrivate.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const prevRequest = error?.config;
//       if (error?.response?.status === 403 && !prevRequest?.sent) {
//         prevRequest.sent = true;
//         const newAccessToken = await refresh();
//         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return apiPrivate(prevRequest);
//       }
//       return Promise.reject(error);
//     }
//   );

//   // let isMounted = true;
//   const controller = new AbortController();

//   try {
//     const response = await apiPrivate.get("/users", {
//       signal: controller.signal,
//     });
//     console.log(response.data);
//     //
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     apiPrivate.interceptors.request.eject(responseIntercept);
//     apiPrivate.interceptors.request.eject(requestIntercept);
//     controller.abort();
//   }
// };



// export const getUser = async (acsTkn) => {
//   const requestIntercept = apiPrivate.interceptors.request.use(
//     (config) => {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${acsTkn}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   const responseIntercept = apiPrivate.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const prevRequest = error?.config;
//       if (error?.response?.status === 403 && !prevRequest?.sent) {
//         prevRequest.sent = true;
//         const newAccessToken = await refresh();
//         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return apiPrivate(prevRequest);
//       }
//       return Promise.reject(error);
//     }
//   );

//   // let isMounted = true;
//   const controller = new AbortController();

//   try {
//     const response = await apiPrivate.get("/users", {
//       signal: controller.signal,
//     });
//     console.log(response.data);
//     //
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     apiPrivate.interceptors.request.eject(responseIntercept);
//     apiPrivate.interceptors.request.eject(requestIntercept);
//     controller.abort();
//   }
// };