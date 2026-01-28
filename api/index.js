// Simple test to check if the function even loads
module.exports = async (req, res) => {
  res.status(200).json({
    message: 'Hello from Vercel!',
    path: req.url,
    nodeVersion: process.version,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      hasDbUrl: !!process.env.DATABASE_URL,
    },
  });
};
