import express from "express";
import Product from "../models/product.model.js";
import SubCategory from "../models/subcategory.model.js";
import { Op } from "sequelize";
import uploadImage from "../middleware/uploadImage.js";

const router = express.Router();

Product.belongsTo(SubCategory, { foreignKey: "categoryId" });
SubCategory.belongsTo(Product, { foreignKey: "categoryId" });

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
      const images = {};
      images.allImages = req.files;

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

export default router;
