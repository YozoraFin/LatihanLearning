import express from "express";
import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";
import { Op } from "sequelize";

const router = express.Router();

// relasi antara category dan subcategory
SubCategory.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(SubCategory, { foreignKey: "categoryId" });

router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: SubCategory }],
    });

    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params
    const category = await Category.findByPk(id);

    return res.status(200).json({ data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await Category.findOne({
      where: { categoryName: categoryName },
    });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const createCategory = await Category.create({
      categoryName: categoryName,
    });

    return res
      .status(201)
      .json({ message: "Category created succesful", data: createCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const duplicateCategory = await Category.findOne({
      where: {
        categoryName: categoryName,
        categoryId: { [Op.ne]: id }, // Not equal to the current id
      },
    });

    if (duplicateCategory) {
      return res.status(400).json({ message: "Category name already exists" });
    }

    await category.update({ categoryName: categoryName });

    return res
      .status(200)
      .json({ message: "Category updated successfully", data: category });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const {id} = req.params
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
