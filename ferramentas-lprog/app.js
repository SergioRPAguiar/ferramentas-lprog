// config do express
const express = require("express");

const productController = require("./controller/product/productController");

const app = express();
const port = 3000;

const productRouter = express.Router;

// deconding / enconding
app.use(express.urlencoded({ extended: true }));

productRouter
  .route("/api/product")
  .get(productController.getAll)
  .post(productController.addProduct);

productRouter
  .route("/api/product/:id")
  .get(productController.getOne)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

app.Router(productRouter);


app.get("/", (req, res) => {
  res.send("Meu Express está rodando...");
});

/**
 * Configuração da porta
 */
app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});
