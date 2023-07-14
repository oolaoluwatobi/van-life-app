import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (error?.message) {
    return <pre className="px-5 py-14 font-bold text-xl">Error: {error.message}</pre>
  } else {
    return <pre className="px-5 py-14 font-bold text-xl">Error: unknown error</pre>
  }
  
};

export default ErrorPage;
