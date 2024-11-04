const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

client.connect()
  .then(() => console.log('Connected to Redis server'))
  .catch(err => console.error('Redis connection error:', err));

const redisCache = async (req, res, next) => {
  const cacheKey = req.originalUrl;
  console.log("Cache key:", cacheKey);

  try {
    const data = await client.get(cacheKey); // Using async/await here
    console.log("Data retrieved from Redis:", data); // Log data here

    if (data) {
      console.log('Cache hit');
      return res.status(200).json(JSON.parse(data)); // Return cached data
    }

    console.log('Cache miss');
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error('Redis error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { client, redisCache };
