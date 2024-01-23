const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Error in request to " + req.url
    });
};

module.exports = errorHandler;