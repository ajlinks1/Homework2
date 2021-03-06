const Express = require('express');
const BodyParser = require('body-parser');

const Service = require('../services/service_user');
const Error = require('./error_handling');

const app = Express();

app.use(BodyParser.json());

exports.getUsers = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.json(await Service.getUsers(request.query));
  });
};
exports.getUsersSsn = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const getResult = await Service.getUsersSsn({ ssn: request.params.ssn });
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};
exports.postUsers = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await Service.postUsers(request.body);
    response.sendStatus(201);
  });
};
exports.deleteUsers = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Service.deleteUsers(request.query)).deletedCount > 0 ? 200 : 404);
  });
};
exports.deleteUsersSsn = async (request, response) => {
  await Error.doActionThatMightFailValidation(request, response, async () => {
    response.sendStatus((await Service.deleteUsersSsn({
      ssn: request.params.ssn,
    })).deletedCount > 0 ? 200 : 404);
  });
};
exports.putUsers = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    await Service.putUsers({ ssn }, user, {
      upsert: true,
    });
    response.sendStatus(200);
  });
};
exports.patchUser = async (request, response) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.ssn;
  await Error.doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await Service
      .patchUsers({ ssn }, user, {
        new: true,
      });
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};
