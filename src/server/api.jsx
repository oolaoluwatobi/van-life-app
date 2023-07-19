import axios from "axios";
const BASE_URL = "http://localhost:3500/"

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

export default axios.create({
  baseURL: BASE_URL
});

// baseURL: "https://mern-contacts-app.onrender.com/"
// baseURL: "https://mern-contacts-app.onrender.com/subscribers"
// baseURL: "mongodb+srv://oolaoluwatobi:123ola@cluster0.g928usv.mongodb.net/usersdb?retryWrites=true&w=majority"