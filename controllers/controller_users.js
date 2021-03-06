const Express = require('express');
const BodyParser = require('body-parser');

const User = require('../models/user');

const app = Express();

app.use(BodyParser.json());

module.exports = {
  async doActionThatMightFailValidation(request, response, action) {
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
  },
  async getUsers(request, response) {
    await this.doActionThatMightFailValidation(request, response, async () => {
      response.json(await User.find(request.query).select('-_id -__v'));
    });
  },
  async getUsersSsn(request, response) {
    await this.doActionThatMightFailValidation(request, response, async () => {
      const getResult = await User.findOne({ ssn: request.params.ssn }).select('-_id -__v');
      if (getResult != null) {
        response.json(getResult);
      } else {
        response.sendStatus(404);
      }
    });
  },
  async postUsers(request, response) {
    console.log(request.body);
    await this.doActionThatMightFailValidation(request, response, async () => {
      console.log(request.body);
      await new User(request.body).save();
      response.sendStatus(201);
    });
  },
  async deleteUsers(request, response) {
    await this.doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await User.deleteMany(request.query)).deletedCount > 0 ? 200 : 404);
    });
  },
  async deleteUsersSsn(request, response) {
    await this.doActionThatMightFailValidation(request, response, async () => {
      response.sendStatus((await User.deleteOne({
        ssn: request.params.ssn,
      })).deletedCount > 0 ? 200 : 404);
    });
  },
  async putUsers(request, response) {
    const { ssn } = request.params;
    const user = request.body;
    user.ssn = ssn;
    await this.doActionThatMightFailValidation(request, response, async () => {
      await User.findOneAndReplace({ ssn }, user, {
        upsert: true,
      });
      response.sendStatus(200);
    });
  },
  async patchUser(request, response) {
    const { ssn } = request.params;
    const user = request.body;
    delete user.ssn;
    await this.doActionThatMightFailValidation(request, response, async () => {
      const patchResult = await User
        .findOneAndUpdate({ ssn }, user, {
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
