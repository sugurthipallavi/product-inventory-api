from flask import Flask, request, jsonify, make_response, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(
    __name__,
    template_folder="frontend",
    static_folder="frontend",
    static_url_path=""
)

app.config["SQLALCHEMY_DATABASE_URI"] = environ.get(
    "DB_URL",
    "sqlite:///products.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html")

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "price": self.price,
            "quantity": self.quantity
        }


with app.app_context():
    db.create_all()


@app.route("/test", methods=["GET"])
def test():
    return make_response(
        jsonify({"message": "Product Inventory API is working"}),
        200
    )


@app.route("/products", methods=["POST"])
def create_product():
    try:
        data = request.get_json()

        if not data or "name" not in data or "category" not in data \
                or "price" not in data or "quantity" not in data:
            return make_response(
                jsonify({
                    "message": "name, category, price and quantity are required"
                }),
                400
            )

        new_product = Product(
            name=data["name"],
            category=data["category"],
            price=data["price"],
            quantity=data["quantity"]
        )

        db.session.add(new_product)
        db.session.commit()

        return make_response(
            jsonify({
                "message": "product created",
                "product": new_product.json()
            }),
            201
        )

    except Exception:
        db.session.rollback()

        return make_response(
            jsonify({"message": "error creating product"}),
            500
        )


@app.route("/products", methods=["GET"])
def get_products():
    try:
        products = Product.query.all()

        return make_response(
            jsonify([product.json() for product in products]),
            200
        )

    except Exception:
        return make_response(
            jsonify({"message": "error getting products"}),
            500
        )

@app.route("/products/category/<string:category>", methods=["GET"])
def get_products_by_category(category):
    try:
        products = Product.query.filter_by(category=category).all()

        if not products:
            return make_response(
                jsonify({"message": "no products found in this category"}),
                404
            )

        return make_response(
            jsonify([product.json() for product in products]),
            200
        )

    except Exception:
        return make_response(
            jsonify({"message": "error getting products by category"}),
            500
        )

@app.route("/products/low-stock", methods=["GET"])
def get_low_stock_products():
    try:
        products = Product.query.filter(Product.quantity <= 5).all()

        if not products:
            return make_response(
                jsonify({"message": "no low-stock products found"}),
                404
            )

        return make_response(
            jsonify([product.json() for product in products]),
            200
        )

    except Exception:
        return make_response(
            jsonify({"message": "error getting low-stock products"}),
            500
        )

@app.route("/products/summary", methods=["GET"])
def get_summary():
    try:
        products = Product.query.all()

        total_products = len(products)
        total_quantity = sum(product.quantity for product in products)
        total_inventory_value = sum(
            product.price * product.quantity for product in products
        )

        return make_response(
            jsonify({
                "total_products": total_products,
                "total_quantity": total_quantity,
                "total_inventory_value": total_inventory_value
            }),
            200
        )

    except Exception:
        return make_response(
            jsonify({"message": "error getting inventory summary"}),
            500
        )

@app.route("/products/<int:id>", methods=["GET"])
def get_product(id):
    try:
        product = Product.query.filter_by(id=id).first()

        if product:
            return make_response(
                jsonify({"product": product.json()}),
                200
            )

        return make_response(
            jsonify({"message": "product not found"}),
            404
        )

    except Exception:
        return make_response(
            jsonify({"message": "error getting product"}),
            500
        )


@app.route("/products/<int:id>", methods=["PUT"])
def update_product(id):
    try:
        product = Product.query.filter_by(id=id).first()

        if not product:
            return make_response(
                jsonify({"message": "product not found"}),
                404
            )

        data = request.get_json()

        if not data:
            return make_response(
                jsonify({"message": "no data provided"}),
                400
            )

        product.name = data.get("name", product.name)
        product.category = data.get("category", product.category)
        product.price = data.get("price", product.price)
        product.quantity = data.get("quantity", product.quantity)

        db.session.commit()

        return make_response(
            jsonify({
                "message": "product updated",
                "product": product.json()
            }),
            200
        )

    except Exception:
        db.session.rollback()

        return make_response(
            jsonify({"message": "error updating product"}),
            500
        )


@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    try:
        product = Product.query.filter_by(id=id).first()

        if product:
            db.session.delete(product)
            db.session.commit()

            return make_response(
                jsonify({"message": "product deleted"}),
                200
            )

        return make_response(
            jsonify({"message": "product not found"}),
            404
        )

    except Exception:
        db.session.rollback()

        return make_response(
            jsonify({"message": "error deleting product"}),
            500
        )

@app.route("/products/<int:id>/stock", methods=["PATCH"])
def update_stock(id):
    try:
        product = Product.query.filter_by(id=id).first()

        if not product:
            return make_response(
                jsonify({"message": "product not found"}),
                404
            )

        data = request.get_json()

        if not data or "quantity" not in data:
            return make_response(
                jsonify({"message": "quantity is required"}),
                400
            )

        if data["quantity"] < 0:
            return make_response(
                jsonify({"message": "quantity cannot be negative"}),
                400
            )

        product.quantity = data["quantity"]

        db.session.commit()

        return make_response(
            jsonify({
                "message": "stock updated",
                "product": product.json()
            }),
            200
        )

    except Exception:
        db.session.rollback()

        return make_response(
            jsonify({"message": "error updating stock"}),
            500
        )

if __name__ == "__main__":
    app.run(debug=True)