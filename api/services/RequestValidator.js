module.exports.checkParams = function(obj) {

	for(var property in obj) {
		if(!obj[property])
			return false;
	}

	return true;
}