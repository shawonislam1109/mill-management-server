module.exports = (app) => {
  app.use((error, req, res, next) => {
    switch (error.status) {
      case 400: {
        return res.json({ message: "400 page not found" });
      }
      case 422: {
        return res.json({ message: "unprocessed Entry" });
      }
      case 401: {
        return res.json({ message: "Unauthorized fail" });
      }
      case 403: {
        return res.json({ message: "Forbidden" });
      }
      case 500: {
        return res.json({ message: "Internal server Error" });
      }
      case error.code === 11000: {
        const field = Object.keys(error.keyPattern)[0];
        const message = `${field} already exists.`;
        return res.status(409).send({ error: message });
      }
      default: {
        return res.json({ message: error.message });
      }
    }
  });
};
