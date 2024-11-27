import express from "express";
import Product from "../models/product.model.js";
import SubCategory from "../models/subcategory.model.js";
import { Op } from "sequelize";
import uploadImage from "../middleware/uploadImage.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

Product.belongsTo(SubCategory, { foreignKey: "categoryId" });
SubCategory.hasMany(Product, { foreignKey: "categoryId" });

// get semua produk
router.get("/", async (req, res) => {
  try {
    // pagination
    let limit = +req.query.limit || 10;
    let page = +req.query.page || 1;
    let offset = (page - 1) * limit;

    // meemgecek untuk kueri
    if (req.query.search) {
      const allItems = await Product.findAll({
        include: [{ model: SubCategory }],
        where: {
          [Op.or]: [
            { productName: { [Op.like]: `%${req.query.search}%` } },
            { productBrand: { [Op.like]: `%${req.query.search}%` } },
          ],
        },
        limit,
        offset,
      });

      return res.status(200).json({ data: allItems });
    }

    // jika tidak ada kueri penelusuran, kembalikan semua produk dengan data ber-halaman
    const allProducts = await Product.findAll({
      include: [{ model: SubCategory }],
      limit,
      offset,
    });

    return res.status(200).json({ data: allProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get total halaman untuk nomor halaman klien
router.get("/pages", async (req, res) => {
  try {
    const limit = +req.query.limit || 10;
    const allProducts = await Product.findAll();
    const totalPages = Math.ceil(allProducts.length / limit);
    return res.status(200).json({ data: totalPages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get produk berdasarkan id
router.get("/:url", async (req, res) => {
  try {
    const singleProduct = await Product.findOne({
      include: [{ model: SubCategory }],
      where: { productId: req?.params?.url },
    });

    return res.status(200).json({ data: singleProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post(
  "/create",
  uploadImage.uploadMultiple("productImages"),
  async (req, res) => {
    try {
      const {
        productName,
        productBrand,
        productColor,
        productDescription,
        productPrice,
        productQty,
        categoryId,
      } = req.body;
      const images = req.files

      const createProduct = await Product.create({
        productName: productName,
        productBrand: productBrand,
        productColor: productColor,
        productDescription: productDescription,
        productPrice: productPrice,
        productQty: productQty,
        productImages: images,
        categoryId: categoryId,
      });

      return res
        .status(201)
        .json({ message: "Product created successfully", data: createProduct });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Update an existing product
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await Product.findByPk(id);
    const {
      productName,
      productBrand,
      productColor,
      productDescription,
      productPrice,
      productQty,
    } = req.body;

    const updatedProduct = await Product.update(
      {
        productName: productName,
        productBrand: productBrand,
        productColor: productColor,
        productDescription: productDescription,
        productPrice: productPrice,
        productQty: productQty,
      },
      {
        where: { productId: id },
      }
    );

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.patch(
  "/update-images/:id",
  uploadImage.uploadMultiple("productImages"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const currentProduct = await Product.findOne({
        include: [{ model: SubCategory }],
        where: { productId: id },
      });

      if (!currentProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedProduct = await Product.update(
        {
          productImages: req.files,
        },
        {
          where: { productId: id },
        }
      );

      if (updatedProduct) {
        // deleting all the old file paths of the current product
        for (let i = 0; i < currentProduct.productImages?.length; i++) {
          const filename = currentProduct.productImages[i]?.filename;
          if (filename) {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const deletePath = path.join(__dirname, "../uploads/" + filename);
            fs.unlinkSync(deletePath);
          }
        }
        return res
          .status(200)
          .json({ message: "Product images updated successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await existingProduct.destroy();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
