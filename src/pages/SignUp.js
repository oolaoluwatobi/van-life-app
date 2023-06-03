import React from "react";
import {
  useNavigation,
  useLoaderData,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import { signUp } from "../components/Layout";

export async function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')

  const path = new URL(request.url).searchParams.get('redirectTo') || '/host'
  try {
    await signUp(email, password)
    return redirect(`${path}?user=${email}`)
  } catch (error) {
    console.log(error.message)
    return error
  }
}

const SignUp = () => {

  const error = useActionData()

  const navigation = useNavigation()
  // console.log(navigation)

  const message = useLoaderData()

  return (
    <div className="bg-[#ffddb2] mx-auto max-w-xl rounded-xl ">

      <div className="px-16 py-20 mx-auto mt-24 ">

        <h1 className="text-center font-bold text-3xl">
          Sign up
        </h1>
        {message && !error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {message}
          </h1>
        )}
        {error && (
          <h1 className="text-center pt-4 font-semibold text-[#cc0000] text-2xl">
            {error.message}
          </h1>
        )}
        <Form method="post" className="flex flex-col mt-8 rounded " replace>
          <input
            className="indent-2 border border-[#d1d5db] rounded-t p-2 placeholder:text-[#4d4d4d]"
            type="email"
            name="email"
            placeholder="Email address"
          />
          <input
            className="indent-2 border border-[#d1d5db] rounded-b p-2 placeholder:text-[#4d4d4d]"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button disabled={navigation.state === 'submitting'} className="bg-[#ff8c38] text-white font-semibold mt-5 p-4 rounded">
            {navigation.state === 'submitting' ? 'Signing in...' : 'Sign up'}
          </button>
        </Form>
        <h5 className="font-medium text-base mt-10 text-center">
          Create an account to rent a van. 
        </h5>
      </div>

    </div>
  );
};

export default SignUp;
