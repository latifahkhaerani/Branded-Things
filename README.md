[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=24058949&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini
# Branded Things API Documentation

## Endpoints

List of available endpoints:

### Authentication

* POST /login
* POST /add-user

### Product

* GET /product
* POST /product
* GET /product/:id
* PUT /product/:id
* DELETE /product/:id
* PATCH /product/upload-image/:id

### Category

* GET /category
* POST /category
* PUT /category/:id

### Public

* GET /pub/product
* GET /pub/category
* GET /pub/:id

---

# Authentication

## POST /login

Description

Login as Admin or Staff

Request Body

```json
{
  "email": "admin@mail.com",
  "password": "12345"
}
```

Response (200)

```json
{
  "message": "success login",
  "access_token": "<jwt_token>"
}
```

Response (400)

```json
{
  "message": "Please input email or password"
}
```

Response (401)

```json
{
  "message": "Invalid email or password"
}
```

---

## POST /add-user

Description

Create new Staff account. Only Admin can access this endpoint.

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body

```json
{
  "username": "staff1",
  "email": "staff@mail.com",
  "password": "12345",
  "phoneNumber": "08123456789",
  "address": "Jakarta"
}
```

Response (201)

```json
{
  "message": "Success add new user!",
  "data": {
    "id": 2,
    "username": "staff1",
    "email": "staff@mail.com",
    "role": "Staff",
    "phoneNumber": "08123456789",
    "address": "Jakarta"
  }
}
```

Response (400)

```json
{
  "message": "Invalid input"
}
```

Response (401)

```json
{
  "message": "Invalid token"
}
```

```json
{
  "message": "Unauthorized"
}
```

Response (403)

```json
{
  "message": "You don't have any access"
}
```

---

# Product

## GET /product

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200)

```json
{
  "message": "Succeed read products",
  "data": [
    {
      "id": 1,
      "name": "Nike Air Force",
      "description": "Classic sneaker",
      "price": 1500000,
      "stock": 10,
      "imgUrl": "https://...",
      "categoryId": 1,
      "authorId": 1
    }
  ]
}
```

Response (401)

```json
{
  "message": "Invalid token"
}
```

```json
{
  "message": "Unauthorized"
}
```
---

## POST /product

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body

```json
{
  "name": "Nike Air Force",
  "description": "Classic sneaker",
  "price": 1500000,
  "stock": 10,
  "imgUrl": "https://image.jpg",
  "categoryId": 1
}
```

Response (201)

```json
{
  "message": "Succeed Add New Product!",
  "data": {
    "id": 1,
    "name": "Nike Air Force",
    "description": "Classic sneaker",
    "price": 1500000,
    "stock": 10,
    "imgUrl": "https://image.jpg",
    "categoryId": 1,
    "authorId": 1
  }
}
```

Response (400)

```json
{
  "message": "Invalid input"
}
```

Response (401)

```json
{
  "message": "Invalid token"
}
```

```json
{
  "message": "Unauthorized"
}
```

---

## GET /product/:id

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200)

```json
{
  "message": "Succeed read detail by id 1",
  "data": {
    "id": 1,
    "name": "Nike Air Force"
  }
}
```

Response (404)

```json
{
  "message": "Data with id 999 not found"
}
```

---

## PUT /product/:id

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body

```json
{
  "name": "Nike Air Force Updated",
  "description": "Updated description",
  "price": 1700000,
  "stock": 20,
  "imgUrl": "https://image.jpg",
  "categoryId": 1
}
```

Response (200)

```json
{
  "message": "Succeed update product with id 1",
  "data": {
    "id": 1
  }
}
```

Response (403)

```json
{
  "message": "You don't have any access"
}
```

Response (404)

```json
{
  "message": "Data with id 999 not found"
}
```

---

## DELETE /product/:id

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200)

```json
{
  "message": "Succeed delete product with id 1"
}
```

Response (403)

```json
{
  "message": "You don't have any access"
}
```

Response (404)

```json
{
  "message": "Data with id 999 not found"
}
```

---

## PATCH /product/upload-image/:id

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body

multipart/form-data

```txt
img : file
```

Response (200)

```json
{
  "message": "Image nike.jpg success to update!",
  "imgUrl": "https://ik.imagekit.io/xxxxx"
}
```

Response (404)

```json
{
  "message": "Please upload an image"
}
```

Response (404)

```json
{
  "message": "Data with id 999 not found"
}
```

---

# Category

## GET /category

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200)

```json
{
  "message": "Succeed read categories",
  "data": [
    {
      "id": 1,
      "name": "Shoes"
    }
  ]
}
```

---

## POST /category

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body

```json
{
  "name": "Shoes"
}
```

Response (201)

```json
{
  "message": "Succeed add new category!",
  "data": {
    "id": 1,
    "name": "Shoes"
  }
}
```

Response (400)

```json
{
  "message": "Name is required"
}
```

---

## PUT /category/:id

Headers

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body

```json
{
  "name": "Sneakers"
}
```

Response (200)

```json
{
  "message": "Succeed update category with id 1",
  "data": {
    "id": 1,
    "name": "Sneakers"
  }
}
```

Response (404)

```json
{
  "message": "Data with id 999 not found"
}
```

---

# Public

## GET /pub/product

Description

Get all products with search, filter, sorting and pagination.

Query Parameters

| Parameter | Type    | Description                                  |
| --------- | ------- | -------------------------------------------- |
| search    | string  | Search product by name                       |
| filter    | string  | Filter product by category                   |
| sort      | string  | ASC/DESC example: name, -name, price, -price |
| page      | integer | Current page                                 |
| limit     | integer | Number of data per page                      |

Example

```http
GET /pub/product?search=nike&filter=shoes&sort=-price&page=1&limit=10
```

Response (200)

```json
{
  "message": "Succeed read products",
  "data": {
    "page": 1,
    "data": [],
    "totalData": 20,
    "totalPage": 2,
    "dataPerPage": 10
  }
}
```

Response (400)

```json
{
  "message": "Your input does not valid"
}
```

Response (403)

```json
{
  "message": "Data is empty"
}
```

---

## GET /pub/:id

Response (200)

```json
{
  "message": "Succeed read detail by id 1",
  "data": {
    "id": 1,
    "name": "Nike Air Force"
  }
}
```

Response (404)

```json
{
  "message": "Data with id 999 not found"
}
```

---

## GET /pub/category

Response (200)

```json
{
  "message": "Succeed read categories",
  "data": [
    {
      "id": 1,
      "name": "Shoes"
    }
  ]
}
```

---

# Global Error

## 400 Bad Request

```json
{
  "message": "Please input email or password"
}
```

```json
{
  "message": "Your input does not valid"
}
```

```json
{
  "message": "Invalid input"
}
```

---

## 401 Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

```json
{
  "message": "Invalid token"
}
```


```json
{
  "message": "Unauthorized"
}
```

---

## 403 Forbidden

```json
{
  "message": "You don't have any access"
}
```

```json
{
  "message": "Please upload an image"
}
```

```json
{
  "message": "Data is empty"
}
```

---

## 404 Not Found

```json
{
  "message": "Data with id 999 not found"
}
```

---

## 500 Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```
