import express from "express";
import Product from "../models/product.model";
import SubCategory from "../models/subcategory.model";
import { Op } from "sequelize";

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

export default router;
