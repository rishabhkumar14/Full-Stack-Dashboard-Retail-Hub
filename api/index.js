import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const prisma = new PrismaClient();
const dataArea = [
  { name: "January", uv: 400, pv: 240, amt: 240 },
  { name: "February", uv: 300, pv: 139, amt: 221 },
  { name: "March", uv: 200, pv: 980, amt: 229 },
  { name: "April", uv: 278, pv: 390, amt: 200 },
  { name: "May", uv: 189, pv: 480, amt: 218 },
  { name: "June", uv: 239, pv: 380, amt: 250 },
  { name: "July", uv: 349, pv: 430, amt: 210 },
];

const dataPie = [
  { name: "Category A", value: 400, color: "#8884d8" },
  { name: "Category B", value: 300, color: "#81c99c" },
  { name: "Category C", value: 200, color: "#edb852" },
  { name: "Category H", value: 120, color: "#e91e63" },
];

const dataBar = [
  { category: "Category A", value1: 150, value2: 200, value3: 120 },
  { category: "Category B", value1: 250, value2: 100, value3: 180 },
  { category: "Category C", value1: 100, value2: 300, value3: 150 },
  { category: "Category D", value1: 200, value2: 150, value3: 220 },
  { category: "Category E", value1: 180, value2: 120, value3: 250 },
];

const dataLine = [
  { month: "Jan", users: 100, sessions: 220, revenue: 350 },
  { month: "Feb", users: 150, sessions: 300, revenue: 400 },
  { month: "Mar", users: 200, sessions: 400, revenue: 500 },
  { month: "Apr", users: 250, sessions: 500, revenue: 600 },
  { month: "May", users: 300, sessions: 600, revenue: 700 },
];

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/dashboard-data", (req, res) => {
  res.json({
    dataArea,
    dataPie,
    dataBar,
    dataLine,
  });
});

// Categories Endpoints

// GET: list of all categories
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
});

// POST: creates new category
app.post("/categories", async (req, res) => {
  const { category_name, category_description, emoji } = req.body;
  const newCategory = await prisma.category.create({
    data: {
      category_name,
      category_description,
      emoji,
    },
  });
  res.status(201).json(newCategory);
});

// GET: return Category with :id
app.get("/categories/:id", async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).send(`Category id ${categoryId} not found`);
  }
});

// PUT: updates Category name, description, or symbol with :id
app.put("/categories/:id", async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const { category_name, category_description, emoji } = req.body; // Use correct keys
  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { category_name, category_description, emoji }, // Use correct keys
  });
  res.status(200).json(updatedCategory);
});

// DELETE: deletes Category with :id
app.delete("/categories/:id", async (req, res) => {
  const categoryId = parseInt(req.params.id);
  await prisma.category.delete({
    where: { id: categoryId },
  });
  res.status(204).send();
});

// Items Endpoints

// GET: list of items by category
app.get("/items/:categoryId", async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  const items = await prisma.item.findMany({
    where: { categoryId },
  });
  res.status(200).json(items);
});

// POST: creates new item
app.post("/items", async (req, res) => {
  const { item_name, item_description, price, categoryId } = req.body;

  try {
    const newItem = await prisma.item.create({
      data: {
        item_name,
        item_description,
        price,
        quantity: 0,
        category: { connect: { id: categoryId } },
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target === "Item_item_name_key") {
      // Handle unique constraint violation gracefully
      res.status(400).json({
        error: "Item name already exists. Please choose a different name.",
      });
    } else {
      console.error("Error adding item:", error);
      res.status(500).json({ error: "Failed to add item" });
    }
  }
});

// GET: return Item with :id
app.get("/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).send(`Item id ${itemId} not found`);
  }
});

// PUT: updates Item description or price with :id
app.put("/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id);
  const { item_description, price } = req.body;
  const updatedItem = await prisma.item.update({
    where: { id: itemId },
    data: { item_description, price },
  });
  res.status(200).json(updatedItem);
});

// DELETE: deletes Item with :id
app.delete("/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id);
  await prisma.item.delete({
    where: { id: itemId },
  });
  res.status(204).send();
});

// Starts HTTP Server
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
