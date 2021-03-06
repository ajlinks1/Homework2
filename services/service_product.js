const Product = require('../models/product');

exports.getProducts = async (query) => Product.find(query).select('-_id -__v');
exports.getProductsSku = async (sku) => Product.findOne({ sku }).select('-_id -__v');
exports.postProducts = async (body) => new Product(body).save();
exports.deleteProducts = async (query) => Product.deleteMany(query);
exports.deleteProductsSku = async (sku) => Product.deleteOne({ sku });
exports.putProducts = async (sku, product) => Product.findOneAndReplace({ sku }, product,
  { upsert: true });
exports.patchProducts = async (sku, product) => Product.findOneAndUpdate(
  { sku }, product,
  {
    new: true,
  },
).select('-_id -__v');
