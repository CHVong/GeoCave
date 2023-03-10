const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  const status = res.statusCode ? res.statusCode : 500; // server error
  res.status(status);
  res.json({ message: err.message });
};

module.exports = errorHandler;
