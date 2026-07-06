import { Product } from "../product/product.model";
import { Sale } from "../sale/sale.model";

const getDashboardStats = async () => {
  const [totalProducts, totalSales, lowStockProducts] = await Promise.all([
    Product.countDocuments({ isDeleted: false }),
    Sale.countDocuments(),
    Product.find({ stock: { $lt: 5 }, isDeleted: false })
      .select("name sku stock category image")
      .sort("stock"),
  ]);

  return { totalProducts, totalSales, lowStockProducts };
};

export const DashboardService = { getDashboardStats };
