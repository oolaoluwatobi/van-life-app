# van-life-app
van-life web app , react, react-router-dom v6.4, Nodejs, Express, MongoDB



# Van life App

Van life app, sign up rent a van. 

React App with JWT Authentication and Protected Routes

This repository contains a React application that demonstrates how to implement JWT (JSON Web Token) authentication and authorization in a React app using React Router for navigation and managing protected routes. JWT is a widely adopted standard for securely transmitting information between parties as a JSON object.

It is the frontend part of a fullstack app, MERN stack, [link to backend repo](https://github.com/oolaoluwatobi/server-van-life-app-mern)  


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication and Authorization](#authentication-and-authorization)
- [Protected Routes](#protected-routes)
- [Contributing](#contributing)
- [License](#license)

## Introduction

In this React app, we have built a simple and scalable authentication and authorization system using JWT. It allows users to sign up, log in, and access protected routes based on their authentication status and user roles.

## Features

- User registration with JWT-based authentication
- User login to access the application's protected resources
- Securely stored JWT tokens in local storage for persisting user sessions
- Role-based authorization to control access to different parts of the application
- React Router to handle navigation and protected route management

## Installation

Follow these steps to set up and run the application locally:

1. Clone the repository:

```bash
git clone https://github.com/oolaoluwatobi/van-life-app
```

## Usage

To start the development server and run the React application, use the following command:

```bash
npm start
```

## Authentication and Authorization

The app implements JWT-based authentication to handle user registration and login. When a user registers or logs in, the server generates a JWT token and sends it back to the client. This token is stored in the local storage to persist the user session.

The JWT token contains encrypted user information and an expiration date. It is sent with each subsequent request to the server as an authorization header, allowing the server to verify the user's identity and grant or deny access to protected routes based on the user's role.


## Protected Routes

Protected routes are components that require authentication and specific user roles to access. If a user tries to access a protected route without being authenticated or having the necessary role, they will be redirected to the login page.
## Screenshots

![App Screenshot](https://github.com/oolaoluwatobi/van-life-app/blob/master/public/Van-life%20app%20home%202023-07-25%20140843.png)
![App Screenshot](https://github.com/oolaoluwatobi/van-life-app/blob/master/public/Vanlife%20app%20error%202023-07-25%20140734.png)
![App Screenshot](https://github.com/oolaoluwatobi/van-life-app/blob/master/public/vanlife%202023-07-25%20140546.png)

![App Screenshot](https://github.com/oolaoluwatobi/van-life-app/blob/master/public/Dashboard%202023-07-26%20205612.png)
![App Screenshot](https://github.com/oolaoluwatobi/van-life-app/blob/master/public/Host%20vans%202023-07-26%20205715.png)

