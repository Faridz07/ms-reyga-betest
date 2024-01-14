const { createClient } = require('redis');

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

const setCache = async (key, expiry, value) => {
  if (value === null) {
    await client.del(key);
  } else {
    await client.setEx(key, expiry, value);
  }
};

const getCache = async (key) => {
  return await client.get(key);
};

module.exports = { getCache, setCache };
