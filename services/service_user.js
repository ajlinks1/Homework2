const User = require('../models/user.js');

exports.getUsers = async (query) => User.find(query).select('-_id -__v');
exports.getUsersSsn = async (ssn) => User.findOne({ ssn }).select('-_id -__v');
exports.postUsers = async (body) => new User(body).save();
exports.deleteUsers = async (query) => User.deleteMany(query);
exports.deleteUsersSsn = async (ssn) => User.deleteOne({ ssn });
exports.putUsers = async (ssn, user) => User.findOneAndReplace({ ssn }, user,
  { upsert: true });
exports.patchUsers = async (ssn, user) => User.findOneAndUpdate(
  { ssn }, user,
    {
        new: true,
    },
).select('-_id -__v');

