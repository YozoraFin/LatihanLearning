import express from "express";
import SubCategory from "../models/subcategory.model.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allSubCategory = SubCategory.findAll({
      include: [{ model: Category }, { model: Product }],
    });

    return res.status(200).json({ data: allSubCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get subkategori by nama
router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const allSubCategory = await SubCategory.findAll({
      include: [{ model: Category }, { model: Product }],
      where: { sub_categoryName: name },
    });

    return res.status(200).json({ data: allSubCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get subkategori by id kategori
router.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allSubCategory = await SubCategory.findAll({
      include: [{ model: Category }, { model: Product }],
      where: { categoryId: id },
    });

    return res.status(200).json({ data: allSubCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get semua produk dari satu subkategori by subkategori id
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allSubCategory = await SubCategory.findAll({
      where: { sub_categoryId: id },
      include: [{ model: Category }, { model: Product }],
    });

    return res.status(200).json({ data: allSubCategory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { subCategoryName } = req.body;
    const subCategory = await SubCategory.findOne({
      where: { sub_categoryName: subCategoryName },
    });

    if (subCategory) {
      return res.status(400).json({ message: "Sub Category already exists" });
    }

    const createSubCategory = await SubCategory.create({
      sub_categoryName: subCategoryName,
    });

    return res.status(201).json({
      message: "Sub Category created successful",
      data: createSubCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { subCategoryName } = req.body;

    const existingSubCategory = await SubCategory.findByPk(id);

    if (!existingSubCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    const duplicateSubCategory = await SubCategory.findOne({
      where: {
        sub_categoryName: subCategoryName,
        sub_categoryId: { [Op.ne]: id }, // Not equal to the current id
      },
    });

    if (duplicateSubCategory) {
      return res
        .status(400)
        .json({ message: "Sub Category name already exists" });
    }

    await existingSubCategory.update({ sub_categoryName: subCategoryName });

    return res.status(200).json({
      message: "Sub Category updated successfully",
      data: existingSubCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByPk(id);
    if (!subCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    await subCategory.destroy();

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
