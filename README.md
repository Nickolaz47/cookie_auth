# Cookie-Auth

This repository was created to study authentication through cookies. Here the API send the cookies in the response and the SPA send back them through request. That way we avoid XSS-type attacks that aim to steal the user's access token.

## Dependencies

- NodeJS

## How it works

When you send a request to login or register routes, the API will return two cookies. The first cookie is named authAccessCookie and stores the jwt access token of the user. This token expires after 15 seconds and it is necessary to get the user data. 

The second cookie is named authRefreshCookie and stores the refresh token of the user. This token not expires and is necessary to generate a new access token. When the refresh token is generated, its value is stored in database to ensure that only refresh tokens registered in DB can create new access tokens.

Both cookies are http-only and cannot be access through JavaScript. To ensure that the frontend requests will pass these cookies to API is required to add some config in the fetch API/library. Here the parameter "withCredentials: true" is used in axios. Some similar config is set in API to send the cookies to the frontend. The cors library needs the parameter "credentials: true" to set the cookies in web browser.

The cookies are removed from the web browser through the logout route. Besides that, the refresh token is deleted from database.

## Routes

### 1) POST login

- URL

```curl
http://localhost:3000/login
```

- Request

```json
{
  "email": "nicolas@mail.com",
  "password": "12345678"
}
```

- Response

```json
{
  "id": "cc9e750e-0426-41ac-a898-c68a532d58a2"
}
```

### 2) POST register

- URL

```curl
http://localhost:3000/register
```

- Request

```json
{
  "name": "Nicolas",
  "email": "nicolas@mail.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
```

- Response

```json
{
  "id": "cc9e750e-0426-41ac-a898-c68a532d58a2"
}
```

### 3) GET get user info

- URL

```curl
http://localhost:3000/users/cc9e750e-0426-41ac-a898-c68a532d58a2
```

- Request

```json
{}
```

- Response

```json
{
  "id": "cc9e750e-0426-41ac-a898-c68a532d58a2",
  "name": "Nicolas",
  "email": "nicolas@mail.com",
  "createdAt": "2022-10-27 21:13:02.231 +00:00",
  "updatedAt": "2022-10-27 21:13:02.231 +00:00"
}
```

### 4) GET logout

- URL

```curl
http://localhost:3000/logout
```

- Request

```json
{}
```

- Response

```json
{
  "auth": false
}
```

## Setup

```bash
git clone https://github.com/Nickolaz47/cookie_auth.git
cd ./frontend && npm install
cd ./backend && npm install
```

After that is necessary to create a .env file inside both the frontend and the backend folders. Each file should have these keys:

1. Frontend

```
REACT_APP_API_URL=your_api_url
```

2. Backend

```
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_ACCESS_SECRET=your_jwt_access_secret
PORT=your_port
FRONT_URL=your_front_url
```

## Running SPA and API

1. Frontend

```
cd ./frontend
npm start
```

2. Backend

```
cd ./backend
npm start
```

## Testing API

There are tests for all the API routes, you just need to start the API server and run the following commands:

```
cd ./backend
npm run test
```
