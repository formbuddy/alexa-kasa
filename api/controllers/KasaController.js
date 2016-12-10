/**
 * KasaController
 *
 * @description :: Server-side logic for managing kasas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Hs100Api = require('hs100-api');

module.exports = {

	index: function(req, res) {

		var jsonResponse = {};
		
		var device = req.param('device');
		var state = req.param('state');
		jsonResponse['device'] = device;
		jsonResponse['state'] = state;

		var setState = {'on': true, 'off': false};

		//valid states are 'on' and 'off'
		if(state !== 'on' && state !== 'off'){
			jsonResponse['error'] = 'Invalid state';
			return res.json(jsonResponse);
		}

		//fetch ip of device
		var ip = sails.config.devices[device];
		if(!ip){
			jsonResponse['error'] = 'Invalid device';
		} else {
			jsonResponse['ip'] = ip;
		}

		var client = new Hs100Api.Client();
		var plug = client.getPlug({host: ip});

		plug.setPowerState(setState[state]).then(function(data){
			jsonResponse['response'] = data;
			return res.json(jsonResponse);
		});
	}
};

