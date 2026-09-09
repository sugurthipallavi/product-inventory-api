# Product Inventory API

A simple REST API built using Flask, PostgreSQL, SQLAlchemy, and Docker.

## Technologies Used

* Python
* Flask
* Flask-SQLAlchemy
* PostgreSQL
* Docker
* Docker Compose
* Postman

## Project Structure

```text
product-inventory/
│
├── app.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .gitignore
└── README.md
```

## Database

The application uses PostgreSQL as the database.

Docker Compose creates two services:

* `flask_app` - Flask application
* `product_db` - PostgreSQL database

## Running the Application

Start the PostgreSQL container:

```bash
docker compose up -d product_db
```

Build the Flask application image:

```bash
docker compose build
```

Check the Docker images:

```bash
docker images
```

Start the Flask application:

```bash
docker compose up flask_app
```

To run the application in the background instead:

```bash
docker compose up -d flask_app
```

To view logs:

```bash
docker compose logs
```

To check running and stopped containers:

```bash
docker ps -a
```

The API runs on:

```text
http://localhost:4000
```

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

```json
{
    "name": "Wireless Mouse",
    "category": "Electronics",
    "price": 799,
    "quantity": 25
}
```

## API Base URL

```text
http://localhost:4000
```

The API can be tested using Postman.
