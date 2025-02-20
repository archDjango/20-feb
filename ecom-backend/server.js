const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecom_db",
});

db.connect(err => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to MySQL");
});

// ✅ GET all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ✅ GET single product by ID
app.get("/products/:id", (req, res) => {
  db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]); 
  });
});

// ✅ POST (Add new product)
app.post("/products", (req, res) => {
  const { name, description, price, category, stock } = req.body;
  db.query(
    "INSERT INTO products (name, description, price, category, stock) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, category, stock],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});

// ✅ PUT (Update a product)
app.put("/products/:id", (req, res) => {
  const { name, description, price, category, stock } = req.body;
  db.query(
    "UPDATE products SET name=?, description=?, price=?, category=?, stock=? WHERE id=?",
    [name, description, price, category, stock, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product updated successfully!" });
    }
  );
});

// ✅ DELETE (Remove product)
app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted successfully!" });
  });
});

// ✅ Start server
app.listen(4000, () => console.log("Server running on port 4000"));
