const apiToken = process.env.API_TOKEN

module.exports = function(req, res, next) {
    if(req.headers.api_token !== apiToken) {
        console.log("req.headers.api_token = " + req.headers.api_token);
        console.log("apiToken = " + apiToken);
        console.log("Request is not authorized.");
        return res.status(401).json({
            message: "Request is not authorized."
        });
    }
    next();
};
