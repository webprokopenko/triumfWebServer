/** 
 * @file utilsETH.js
 */

let sha3 = require('./sha3.js');
/**
 * Convert Number to Hes String
 * @method convertNumberToHex
 * @param {number} num 
 * @return {string}
 */
const convertNumberToHex = function (num) {
    return `0x${num.toString(16)}`
}
/**
 * @method convertHexToInt
 * @param {string} hex 
 * @return {number}
 */
const convertHexToInt = function (hex) {
    return `${parseInt(hex, 16)}`
}
/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {string} address the given HEX adress
 * @return {boolean}
*/
const isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {string} address the given HEX adress
 * @return {boolean}
*/
const isChecksumAddress = function (address) {
    // Check each case
    address = address.replace('0x','');
    let addressHash = sha3(address.toLowerCase());

    for (let i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};
module.exports = {
    convertNumberToHex: convertNumberToHex,
    convertHexToInt:    convertHexToInt,
    isAddress:          isAddress,
    isChecksumAddress:  isChecksumAddress
}