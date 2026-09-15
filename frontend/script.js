const API_URL = "/products";


async function loadSummary() {

    try {

        const response = await fetch(`${API_URL}/summary`);

        if (!response.ok) {
            throw new Error("Failed to load summary");
        }

        const data = await response.json();

        document.getElementById("totalProducts").textContent =
            data.total_products;

        document.getElementById("totalQuantity").textContent =
            data.total_quantity;

        document.getElementById("inventoryValue").textContent =
            `₹${data.total_inventory_value}`;

    } catch (error) {

        console.error("Error loading summary:", error);

    }
}


async function loadProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {

        console.error("Error loading products:", error);

    }
}


function displayProducts(products) {

    const container =
        document.getElementById("productsContainer");

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    products.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <h3>${product.name}</h3>

            <p>
                <strong>Category:</strong>
                ${product.category}
            </p>

            <p>
                <strong>Price:</strong>
                ₹${product.price}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${product.quantity}
            </p>

            <div class="product-actions">

                <button onclick="editProduct(${product.id})">
                    Edit
                </button>

                <button onclick="updateStock(${product.id})">
                    Update Stock
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteProduct(${product.id})">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(productCard);

    });
}


/* Add Product */

document.getElementById("productForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const productData = {

            name: document.getElementById("name").value,

            category:
                document.getElementById("category").value,

            price:
                Number(document.getElementById("price").value),

            quantity:
                Number(document.getElementById("quantity").value)

        };


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(productData)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);
                return;

            }


            alert("Product added successfully!");


            document
                .getElementById("productForm")
                .reset();


            await loadProducts();

            await loadSummary();


        } catch (error) {

            console.error(
                "Error adding product:",
                error
            );

            alert("Error adding product");

        }

    }
);


/* Category Filter */

async function filterByCategory() {

    const category =
        document
            .getElementById("categoryFilter")
            .value
            .trim();


    if (!category) {

        alert("Please enter a category");
        return;

    }


    try {

        const response = await fetch(
            `${API_URL}/category/${encodeURIComponent(category)}`
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message);
            return;

        }


        displayProducts(data);


    } catch (error) {

        console.error(
            "Error filtering products:",
            error
        );

        alert("Error filtering products");

    }
}


/* Low Stock */

async function loadLowStock() {

    try {

        const response =
            await fetch(`${API_URL}/low-stock`);


        const data = await response.json();


        if (!response.ok) {

            alert(data.message);
            return;

        }


        displayProducts(data);


    } catch (error) {

        console.error(
            "Error loading low-stock products:",
            error
        );

        alert("Error loading low-stock products");

    }
}


/* Update Stock */

function updateStock(id) {

    document.getElementById("stockId").value = id;

    document.getElementById("newQuantity").value = "";

    document.getElementById("stockModal").style.display = "block";

}


document.getElementById("stockForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        const id =
            document.getElementById("stockId").value;

        const quantity =
            Number(
                document.getElementById("newQuantity").value
            );


        try {

            const response = await fetch(
                `${API_URL}/${id}/stock`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        quantity: quantity
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);
                return;

            }


            alert("Stock updated successfully!");


            closeStockModal();

            await loadProducts();

            await loadSummary();


        } catch (error) {

            console.error(
                "Error updating stock:",
                error
            );

            alert("Error updating stock");

        }

    }
);


function closeStockModal() {

    document.getElementById("stockModal").style.display =
        "none";

}


/* Edit Product */

async function editProduct(id) {

    try {

        const response =
            await fetch(`${API_URL}/${id}`);


        const data = await response.json();


        if (!response.ok) {

            alert(data.message);
            return;

        }


        const product = data.product;


        document.getElementById("editId").value =
            product.id;

        document.getElementById("editName").value =
            product.name;

        document.getElementById("editCategory").value =
            product.category;

        document.getElementById("editPrice").value =
            product.price;

        document.getElementById("editQuantity").value =
            product.quantity;


        document.getElementById("editModal").style.display =
            "block";


    } catch (error) {

        console.error(
            "Error loading product:",
            error
        );

        alert("Error loading product");

    }

}


/* Save Edited Product */

document.getElementById("editForm").addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const id =
            document.getElementById("editId").value;


        const updatedProduct = {

            name:
                document.getElementById("editName").value,

            category:
                document.getElementById("editCategory").value,

            price:
                Number(
                    document.getElementById("editPrice").value
                ),

            quantity:
                Number(
                    document.getElementById("editQuantity").value
                )

        };


        try {

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedProduct)
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data.message);
                return;

            }


            alert("Product updated successfully!");


            closeEditModal();

            await loadProducts();

            await loadSummary();


        } catch (error) {

            console.error(
                "Error updating product:",
                error
            );

            alert("Error updating product");

        }

    }
);


function closeEditModal() {

    document.getElementById("editModal").style.display =
        "none";

}


/* Delete Product */

async function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message);
            return;

        }


        alert("Product deleted successfully!");


        await loadProducts();

        await loadSummary();


    } catch (error) {

        console.error(
            "Error deleting product:",
            error
        );

        alert("Error deleting product");

    }

}


loadSummary();

loadProducts();