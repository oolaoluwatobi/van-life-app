import { redirect } from "react-router-dom"

export async function requireAuth(request) {
  const path = new URL(request.url).pathname
  const isLoggedIn = sessionStorage.getItem("loggedIn")
  // console.log(isLoggedIn, request, path, 'requireAuth')
  
  if(!isLoggedIn) {
    throw redirect(`/login?message=You must log in first!&redirectTo=${path}`)
  }
  return null
  // console.log(`${path}?user=${user}`)
}
