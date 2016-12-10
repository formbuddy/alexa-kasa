module.exports = function(req, res, next) {

	var token = req.param('token');
	var jsonResponse = {};
		
	if(!token) {
		return res.forbidden('Token not passed');
	}

	if(token !== sails.config.ifttt.token) {
		return res.forbidden('Token mismatch');
	}

	return next();
};