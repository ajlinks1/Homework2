const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');

const app = Express();

app.use(BodyParser.json());

const productRoute = require('./routes/route_product');
const userRoute = require('./routes/route_user');

app.use('/', productRoute);
app.use('/', userRoute);

(async () => {
  try {
    const { ADDRESS } = process.env;
    await Mongoose.connect(ADDRESS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,

    });
    app.listen(8000);
  } catch (e) {
    console.log(new Error('Database Connection Failed'));
  }
})();
