const Express = require('express');
const BodyParser = require('body-parser');

const Service = require('../services/service_product');
const Error = require('./error_handling');

const app = Express();

app.use(BodyParser.json());

exports.getProducts = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.getProducts(request.query));
  });
};
exports.getProductsSku = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Service.getProductsSku({ sku: request.params.sku });
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};
exports.postProducts = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await Service.postProducts(request.body);
    response.sendStatus(201);
  });
};
exports.deleteProducts = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((
      await Service.deleteProducts(request.query)).deletedCount > 0 ? 200 : 404);
  });
};
exports.deleteProductsSku = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Service.deleteProductsSku({
      sku: request.params.sku,
    })).deletedCount > 0 ? 200 : 404);
  });
};
exports.putProducts = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  product.sku = sku;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await Service.putProducts({ sku }, product, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};
exports.patchProducts = async (request, response) => {
  const { sku } = request.params;
  const product = request.body;
  delete product.sku;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Service
      .patchProducts({ sku }, product, {
        new: true,
      });

    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};
