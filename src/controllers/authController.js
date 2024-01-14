const jwt = require('jsonwebtoken');

const generateToken = async (req, res) => {
  try {
    const payload = {
      user: "test",
      issuer: process.env.APP_NAME
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateToken };
