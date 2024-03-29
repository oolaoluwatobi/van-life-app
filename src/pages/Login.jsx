import React from "react";
import {
  Link,
  useNavigation,
  useLoaderData,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import api from '../server/api'

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData()
  const userName = formData.get('userName')
  const pwd = formData.get('pwd')

  // if (!userName || !pwd) throw new Error('username and password required')
  
  const path = new URL(request.url).searchParams.get('redirectTo') || '/host'
  try {
    console.log( userName, pwd )
    const res = await api.post('/auth', 
      { userName, pwd },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    sessionStorage.setItem("loggedIn", true)
    sessionStorage.setItem("user", userName)
    console.log(res, res.data)
    return res, redirect(`${path}?user=${userName}`)
  } catch (error) {
    console.log(error, error?.response?.data, error?.message)
    sessionStorage.setItem("loggedIn", false)
    sessionStorage.removeItem("user")
    return error
  }
}

const Login = () => {

  const error = useActionData()
  

  const navigation = useNavigation()
  
  const message = useLoaderData()
  console.log(error, message, message?.data)
  console.log(error, error?.message  )

  return (
    <div className="hfit fle hfull   bg-[#ffddb2 pb-10 rounded-xl ">
      <div className="p-5 pt-20 mx-auto max-w-xl mt-24">
        <h1 className="text-center font-bold text-3xl">
          Sign in to your account
        </h1>
        {/* {message && ( */}
        {message && !error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {message}
          </h1>
        )}
        {error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            { error?.response?.data?.message || error?.response?.data || error?.message  }
          </h1>
        )}
        <Form method="post" className="flex flex-col mt-8 rounded " replace>
          {/* <input
            className="indent-2 border border-[#d1d5db] rounded-t p-2 placeholder:text-[#4d4d4d]"
            type="email"
            name="email"
            placeholder="Email address"
          /> */}
          <input
            className="indent-2 border border-[#d1d5db] rounded-t p-2 placeholder:text-[#4d4d4d]"
            type="username"
            name="userName"
            placeholder="username"
          />
          <input
            className="indent-2 border border-[#d1d5db] rounded-b p-2 placeholder:text-[#4d4d4d]"
            type="password"
            name="pwd"
            placeholder="Password"
          />
          <button disabled={navigation.state === 'submitting'} className="bg-[#ff8c38] text-white font-semibold mt-5 p-4 rounded">
            {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
          </button>
        </Form>
        <h5 className="font-medium text-base mt-10 text-center">
          Don't have an account?{" "}
          <Link to={'/signup'} className="text-[#ff8c38] font-bold">Create one now</Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
