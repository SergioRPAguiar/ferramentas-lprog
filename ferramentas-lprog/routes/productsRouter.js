const productController = require("./controller/product/productController");




exports.productRouter 
  .route("/api/product")
  .get(productController.getAll)
  .post(productController.addProduct);

exports.productRouter
  .route("/api/product/:id")
  .get(productController.getOne)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);