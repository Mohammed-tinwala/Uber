# POST /api/users/register

Create a new user account.

## Endpoint

- Method: POST
- URL: /api/users/register
- Headers: `Content-Type: application/json`

## Request body

The endpoint expects a JSON object with the following shape:

```json
{
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "email": "string",
  "password": "string"
}
```

Fields and validation rules:

- `fullName.firstName` (string) — required, minimum 3 characters
- `fullName.lastName` (string) — required, minimum 3 characters
- `email` (string) — required, must be a valid email address, minimum 5 characters
- `password` (string) — required, minimum 6 characters

Notes:
- The server hashes the password before storing it. The controller shown in the project calls `userModel.hashPassword(password)` before creating the user.
- `email` is unique in the database; attempts to register an already-used email will result in an error (typically a 400 or 409 depending on implementation).

## Example request

```json
POST /api/users/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Responses

- 201 Created
  - Description: User successfully registered. Returns a JWT token and the created user (password is omitted).
  - Example body:

```json
{
  "message": "User registered successfully",
  "token": "<jwt-token>",
  "user": {
    "_id": "64a1f2...",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

- 400 Bad Request
  - Description: Validation errors (missing/invalid fields) or other client errors.
  - Example body (express-validator format):

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- 409 Conflict (or 400 depending on implementation)
  - Description: Email already in use.
  - Example body:

```json
{
  "error": "Email already exists"
}
```

- 500 Internal Server Error
  - Description: Unexpected server error.
  - Example body:

```json
{
  "error": "Internal server error"
}
```

## Implementation notes / contract

- Input: JSON object as specified above.
- Output: On success, a JSON object containing `message`, `token`, and `user` (user object will not include password field).
- Error modes: validation errors (400), duplicate email (409/400), server errors (500).

## Quick testing

Use a REST client (Postman, HTTPie, curl) to POST the JSON body to `/api/users/register` with `Content-Type: application/json`.

Example curl (PowerShell-friendly):

```powershell
curl -Method POST -Uri http://localhost:3000/api/users/register -ContentType "application/json" -Body (@'{
  "fullName": { "firstName": "John", "lastName": "Doe" },
  "email": "john.doe@example.com",
  "password": "secret123"
}'@)
```

## See also
- Controller: `controllers/user.controller.js`
- Route: `routes/user.route.js`
- Model: `models/user.model.js`
- Service: `services/user.service.js`

---
Generated documentation for the `POST /api/users/register` endpoint.