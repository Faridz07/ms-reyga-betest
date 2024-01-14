const User = require('../models/userModel');
const { getCache, setCache } = require('../config/redis');
const { userAccountNumberKey, userIdentityNumberKey } = require('../utils/cacheKeys');
const buildResponse = require('../utils/responseBuilder');

const createUser = async (req, res) => {
  const { userName, accountNumber, emailAddress, identityNumber } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ accountNumber }, { identityNumber }]
    });

    if (existingUser) {
      return buildResponse(res, 409, 'User already exists.')
    }

    const newUser = new User({
      userName,
      accountNumber,
      emailAddress,
      identityNumber
    });

    const savedUser = await newUser.save();
    buildResponse(res, 201, 'User created successfully.', savedUser);;
  } catch (error) {
    buildResponse(res, 500, error.message);
  }
};

const getUserByAccountNumber = async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const cacheKey = userAccountNumberKey(req.params.accountNumber);

  try {
    let cachedUser = await getCache(cacheKey);
    if (cachedUser) {
      const cachedUserData = JSON.parse(cachedUser);
      return buildResponse(res, 200, 'User fetched successfully.', cachedUserData);
    }

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return buildResponse(res, 404, 'User not found.');
    }

    await setCache(cacheKey, 3600, JSON.stringify(user));
    buildResponse(res, 200, 'User fetched successfully.', user);
  } catch (error) {
    buildResponse(res, 500, error.message);
  }
};

const getUserByIdentityNumber = async (req, res) => {
  const identityNumber = req.params.identityNumber;
  const cacheKey = userIdentityNumberKey(identityNumber);

  try {
    let cachedUser = await getCache(cacheKey);
    if (cachedUser) {
      const cachedUserData = JSON.parse(cachedUser);
      return buildResponse(res, 200, 'User fetched successfully.', cachedUserData);
    }

    const user = await User.findOne({ identityNumber });
    if (!user) {
      return buildResponse(res, 404, 'User not found.');
    }

    await setCache(cacheKey, 3600, JSON.stringify(user));
    buildResponse(res, 200, 'User fetched successfully.', user);
  } catch (error) {
    buildResponse(res, 500, error.message);
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const filter = { id: userId };
    const updatedUser = await User.findOneAndUpdate(filter, req.body, { new: true });

    if (!updatedUser) {
      return buildResponse(res, 404, 'User not found.');
    }

    const accountNumberCacheKey = userAccountNumberKey(updatedUser.accountNumber);
    const identityNumberCacheKey = userIdentityNumberKey(updatedUser.identityNumber);
    await setCache(accountNumberCacheKey, 3600, JSON.stringify(updatedUser));
    await setCache(identityNumberCacheKey, 3600, JSON.stringify(updatedUser));

    buildResponse(res, 200, 'User updated successfully.', updatedUser);
  } catch (error) {
    buildResponse(res, 500, error.message);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const filter = { id: userId };
    const deletedUser = await User.findOneAndDelete(filter);

    if (!deletedUser) {
      return buildResponse(res, 404, 'User not found.');
    }

    const accountNumberCacheKey = userAccountNumberKey(deletedUser.accountNumber);
    const identityNumberCacheKey = userIdentityNumberKey(deletedUser.identityNumber);
    
    await setCache(accountNumberCacheKey, 3600, null);
    await setCache(identityNumberCacheKey, 3600, null);

    buildResponse(res, 200, 'User deleted successfully.', deletedUser);
  } catch (error) {
    buildResponse(res, 500, error.message);
  }
};


module.exports = {
  createUser,
  getUserByAccountNumber,
  getUserByIdentityNumber,
  updateUser,
  deleteUser
};
