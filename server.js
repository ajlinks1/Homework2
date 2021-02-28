const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const Service = require('./database');

const app = Express();

app.use(BodyParser.json());

app.get('/products', async (request, response) => {
  await Service.getProducts(request, response);
});

app.get('/products/:sku', async (request, response) => {
  await Service.getProductsSku(request, response);
});

app.post('/products', async (request, response) => {

  await Service.postProducts(request, response);
});

app.delete('/products', async (request, response) => {
  await Service.deleteProducts(request, response);
});

app.delete('/products/:sku', async (request, response) => {
  await Service.deleteProductsSku(request, response);
});

app.put('/products/:sku', async (request, response) => {
  await Service.putProducts(request, response);
});

app.patch('/products/:sku', async (request, response) => {
  await Service.patchProducts(request, response);
});

(async () => {
  const { ADDRESS } = process.env;
  await Mongoose.connect(ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8000);
})();
