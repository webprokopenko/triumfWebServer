//Intel logger setup
const intel = require('intel');
const EthError = intel.getLogger('EthError');
EthError.setLevel(EthError.ERROR).addHandler(new intel.handlers.File(`${appRoot}/logs/oauth/error.log`));


module.exports = {

}