const Category = require("../Models/categoryModel");

export default async function categoryFilterMiddleware(req, res, next) {
  const { category } = req.query;

  if (!category) return next();

  const categoryDoc = await Category.find({ name: category });

  if (!categoryDoc) req.query.category = null;

  req.category = categoryDoc;

  next();
}

module.exports = categoryFilterMiddleware;
