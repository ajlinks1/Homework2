const Express = require('express');
const BodyParser = require('body-parser');

const Product = require('./models/product');

const app = Express();

app.use(BodyParser.json());

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

module.exports = {
  async getProducts(request, response) {
    await doActionThatMightFailValidation(request, response, async () => {
      response.json(await Product.find(request.query).select('-_id -__v'));
    });
  },
  async getProductsSku(request, response) {
    await doActionThatMightFailValidation(request, response, async () => {
      const getResult = await Product.findOne({ sku: request.params.sku }).select('-_id -__v');
      if (getResult != null) {
        response.json(getResult);
      } else {
        response.sendStatus(404);
      }
    });
  },
  async postProducts(response, request) {
    await doActionThatMightFailValidation(request, response, async () => {
      await new Product(request.body).save();
      response.sendStatus(201);
    });
  },
  async deleteProducts(request, response) {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await Product.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
    });
  },
  async deleteProductsSku(request, response) {
    await doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await Product.deleteOne({
        sku: request.params.sku,
      })).deletedCount > 0 ? 200 : 404);
    });
  },
  async putProducts(request, response) {
    const { sku } = request.params;
    const product = request.body;
    product.sku = sku;
    await doActionThatMightFailValidation(request, response, async () => {
      await Product.findOneAndReplace({ sku }, product, {
        upsert: true,
      });
      response.sendStatus(200);
    });
  },
  async patchProducts(request, response) {
    const { sku } = request.params;
    const product = request.body;
    delete product.sku;
    await doActionThatMightFailValidation(request, response, async () => {
      const patchResult = await Product
        .findOneAndUpdate({ sku }, product, {
          new: true,
        })
        .select('-_id -__v');
      if (patchResult != null) {
        response.json(patchResult);
      } else {
        response.sendStatus(404);
      }
    });
  },
};
