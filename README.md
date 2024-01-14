# ms-reyga-betest
ms-reyga-betest is a simple CRUD user data service. This service is designed for Jenius technical test.

## Technology Stack

- **Backend**: Node.js 21
- **Database**: MongoDB, Redis
- **Containerization**: Docker, Docker Compose
- **Authentication**: JWT

## How to Run (Without Docker)
- Execute to install dependencies & run the service:
  ```
  # make all
  ```

## How to Run (With Docker)
- Start containers:
  ```
  # make up
  ```
- Stop containers:
  ```
  # make down
  ```

## API Documentation

### Generate Token
This endpoint generates a new JWT token.

- **Endpoint**: `POST /api/generate-token`
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/generate-token`
- **Description**: Generates a new JWT token for authentication.

#### cURL Request Example:

```bash
curl --location --request POST 'http://localhost:3000/api/generate-token'
```

#### Success Response:

- **Code**: `200 OK`
- **Content**:
  ```json
  {
      "token": "[JWT Token]"
  }
  ```

### Create User

This endpoint is used for creating a new user.

- **Endpoint**: `POST /api/users`
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/users`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer [Your JWT Token]`
- **Description**: Creates a new user with the provided details. Requires JWT token for authorization.

#### cURL Request Example:
```bash
curl --location --request POST 'http://localhost:3000/api/users' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [Your JWT Token]' \
--data-raw '{
    "userName": "user-a",
    "accountNumber": "1234567890987654321",
    "emailAddress": "user-a@example.com",
    "identityNumber": "9876543210123456789"
}'
```

Replace `[Your JWT Token]` with the actual JWT token obtained from the token generation endpoint.

#### Responses:

- **User Already Exists**:
  - **Code**: `409 Conflict`
  - **Content**:
    ```json
    {
        "code": 409,
        "message": "User already exists."
    }
    ```

- **Success**:
  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
        "code": 201,
        "message": "User created successfully.",
        "data": {
            "id": "ffb4b87d-3fd5-4ae0-947c-f8e31bf840c7",
            "userName": "user-a",
            "accountNumber": "1234567890987654321",
            "emailAddress": "user-a@example.com",
            "identityNumber": "9876543210123456789"
        }
    }
    ```

### Get User by Account Number

This endpoint retrieves a user's details based on their account number.

- **Endpoint**: `GET /api/users/account/:accountNumber`
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/users/account/[AccountNumber]`
- **Headers**:
  - `Authorization: Bearer [Your JWT Token]`
- **Description**: Fetches a user's details using their account number. Requires JWT token for authorization.

#### cURL Request Example:

```bash
curl --location --request GET 'http://localhost:3000/api/users/account/1234567890987654321' \
--header 'Authorization: Bearer [Your JWT Token]'
```

Replace `[Your JWT Token]` with the actual JWT token obtained from the token generation endpoint, and `[AccountNumber]` with the user's account number.

#### Responses:

- **User Not Found**:
  - **Code**: `404 Not Found`
  - **Content**:
    ```json
    {
        "code": 404,
        "message": "User not found."
    }
    ```

- **Success**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
        "code": 200,
        "message": "User fetched successfully.",
        "data": {
            "id": "ffb4b87d-3fd5-4ae0-947c-f8e31bf840c7",
            "userName": "user-a",
            "accountNumber": "1234567890987654321",
            "emailAddress": "user-a@example.com",
            "identityNumber": "9876543210123456789"
        }
    }
    ```

### Get User by Identity Number

This endpoint retrieves a user's details based on their identity number.

- **Endpoint**: `GET /api/users/identity/:identityNumber`
- **Method**: `GET`
- **URL**: `http://localhost:3000/api/users/identity/[IdentityNumber]`
- **Headers**:
  - `Authorization: Bearer [Your JWT Token]`
- **Description**: Fetches a user's details using their identity number. Requires JWT token for authorization.

#### cURL Request Example:

```bash
curl --location --request GET 'http://localhost:3000/api/users/identity/9876543210123456789' \
--header 'Authorization: Bearer [Your JWT Token]'
```

Replace `[Your JWT Token]` with the actual JWT token obtained from the token generation endpoint, and `[IdentityNumber]` with the user's identity number.

#### Responses:

- **User Not Found**:
  - **Code**: `404 Not Found`
  - **Content**:
    ```json
    {
        "code": 404,
        "message": "User not found."
    }
    ```

- **Success**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
        "code": 200,
        "message": "User fetched successfully.",
        "data": {
            "id": "ffb4b87d-3fd5-4ae0-947c-f8e31bf840c7",
            "userName": "user-a",
            "accountNumber": "1234567890987654321",
            "emailAddress": "user-a@example.com",
            "identityNumber": "9876543210123456789"
        }
    }
    ```

### Update User

This endpoint updates an existing user's details.

- **Endpoint**: `PUT /api/users/:userId`
- **Method**: `PUT`
- **URL**: `http://localhost:3000/api/users/[UserId]`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer [Your JWT Token]`
- **Description**: Updates the details of an existing user. The user is identified by their unique ID. Requires JWT token for authorization.

#### cURL Request Example:

```bash
curl --location --request PUT 'http://localhost:3000/api/users/ffb4b87d-3fd5-4ae0-947c-f8e31bf840c7' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [Your JWT Token]' \
--data-raw '{
    "userName": "updated-user-a",
    "emailAddress": "updated-user-a@example.com"
}'
```

Replace `[Your JWT Token]` with the actual JWT token obtained from the token generation endpoint, and `[UserId]` with the user's unique ID.

#### Responses:

- **User Not Found**:
  - **Code**: `404 Not Found`
  - **Content**:
    ```json
    {
        "code": 404,
        "message": "User not found."
    }
    ```

- **Success**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
        "code": 200,
        "message": "User updated successfully.",
        "data": {
            "userName": "updated-user-a",
            "accountNumber": "1234567890987654321",
            "emailAddress": "updated-user-a@example.com",
            "identityNumber": "9876543210123456789",
            "id": "ffb4b87d-3fd5-4ae0-947c-f8e31bf840c7"
        }
    }
    ```

### Delete User

This endpoint deletes an existing user.

- **Endpoint**: `DELETE /api/users/:userId`
- **Method**: `DELETE`
- **URL**: `http://localhost:3000/api/users/[UserId]`
- **Headers**:
  - `Authorization: Bearer [Your JWT Token]`
- **Description**: Deletes a user identified by their unique ID. Requires JWT token for authorization.

#### cURL Request Example:

```bash
curl --location --request DELETE 'http://localhost:3000/api/users/7f2f00d5-8e57-402b-b866-1354d4ffdf25' \
--header 'Authorization: Bearer [Your JWT Token]'
```

Replace `[Your JWT Token]` with the actual JWT token obtained from the token generation endpoint, and `[UserId]` with the user's unique ID.

#### Responses:

- **User Not Found**:
  - **Code**: `404 Not Found`
  - **Content**:
    ```json
    {
        "code": 404,
        "message": "User not found."
    }
    ```

- **Success**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
        "code": 200,
        "message": "User deleted successfully.",
        "data": {
            "userName": "user-a",
            "accountNumber": "1234567890987654321",
            "emailAddress": "user-a@example.com",
            "identityNumber": "9876543210123456789",
            "id": "7f2f00d5-8e57-402b-b866-1354d4ffdf25"
        }
    }
    ```
