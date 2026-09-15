# Product Inventory Management System

A simple **Product Inventory Management System** built using Flask, PostgreSQL, SQLAlchemy, Docker, and a frontend dashboard.

The application allows users to manage products, track stock, filter products, view inventory statistics, and perform CRUD operations through both a web interface and REST API.

## Technologies Used

* Python
* Flask
* Flask-SQLAlchemy
* PostgreSQL
* Docker
* Docker Compose
* HTML
* CSS
* JavaScript
* REST API
* Postman

## Project Structure

```text
product-inventory-crud/
│
├── app.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .gitignore
├── README.md
│
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

## Features

* Add new products
* View all products
* View a product by ID
* Update product details
* Delete products
* Filter products by category
* Find low-stock products
* Update product stock
* View inventory summary
* Web-based dashboard
* REST API support
* PostgreSQL database
* Docker containerization

## Database

The application uses **PostgreSQL** as the database.

Docker Compose creates two services:

* `flask_app` - Flask application
* `product_db` - PostgreSQL database

The Flask application connects to PostgreSQL using SQLAlchemy.

## Running the Application

Make sure **Docker Desktop** is running before executing these commands.

### 1. Start PostgreSQL

```bash
docker compose up -d product_db
```

### 2. Build the Flask application

```bash
docker compose build
```

### 3. Start the Flask application

```bash
docker compose up flask_app
```

To run the Flask application in the background:

```bash
docker compose up -d flask_app
```

### 4. Check Docker containers

```bash
docker ps -a
```

### 5. View application logs

```bash
docker compose logs
```

## Application

Once the containers are running, open the following URL in a browser:

```text
http://localhost:4000
```

The web dashboard allows you to:

* Add products
* View products
* Edit products
* Update stock
* Delete products
* Filter products by category
* View low-stock products
* View total products
* View total quantity
* View total inventory value

## API Endpoints

| Method | Endpoint                        | Description              |
| ------ | ------------------------------- | ------------------------ |
| GET    | `/test`                         | Test the API             |
| POST   | `/products`                     | Create a product         |
| GET    | `/products`                     | Get all products         |
| GET    | `/products/<id>`                | Get a product by ID      |
| PUT    | `/products/<id>`                | Update a product         |
| DELETE | `/products/<id>`                | Delete a product         |
| GET    | `/products/category/<category>` | Get products by category |
| GET    | `/products/low-stock`           | Get low-stock products   |
| GET    | `/products/summary`             | Get inventory summary    |
| PATCH  | `/products/<id>/stock`          | Update product stock     |

## Example Product

### Request

```json
{
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 799,
    "quantity": 25
}
```

### POST Request

```text
POST http://localhost:4000/products
```

## Example API Response

```json
{
    "message": "product created",
    "product": {
        "id": 1,
        "name": "Wireless Mouse",
        "category": "Electronics",
        "price": 799,
        "quantity": 25
    }
}
```

## Inventory Summary

The inventory summary endpoint provides:

* Total number of products
* Total quantity of all products
* Total inventory value

Example:

```text
GET http://localhost:4000/products/summary
```

Example response:

```json
{
    "total_products": 5,
    "total_quantity": 120,
    "total_inventory_value": 85000
}
```

## Low Stock

Products with a quantity of **5 or less** are considered low-stock products.

```text
GET http://localhost:4000/products/low-stock
```

## Category Filter

Products can be filtered by category.

Example:

```text
GET http://localhost:4000/products/category/Electronics
```

## Stock Update

The stock quantity of an existing product can be updated using:

```text
PATCH http://localhost:4000/products/<id>/stock
```

Example request:

```json
{
    "quantity": 40
}
```

## Testing with Postman

The REST API can be tested using **Postman**.

The API base URL is:

```text
http://localhost:4000
```

Example:

```text
POST http://localhost:4000/products
GET  http://localhost:4000/products
GET  http://localhost:4000/products/1
PUT  http://localhost:4000/products/1
DELETE http://localhost:4000/products/1
```

## Docker Commands

Useful Docker commands:

```bash
docker compose up -d product_db
```

```bash
docker compose build
```

```bash
docker compose up flask_app
```

```bash
docker compose up -d flask_app
```

```bash
docker compose logs
```

```bash
docker ps -a
```

## API Base URL

```text
http://localhost:4000
```

## Project Purpose

This project demonstrates how to build a simple inventory management application using:

* Flask REST APIs
* PostgreSQL database
* SQLAlchemy ORM
* Docker and Docker Compose
* HTML, CSS and JavaScript frontend
* API testing with Postman

The project provides both a **web-based interface** and **REST API endpoints** for managing product inventory.
