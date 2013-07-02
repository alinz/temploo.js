/** @preserve Temploo.js: Tiny framework for HTML template
 * version: 0.1.0
 * By Ali Najafizadeh, http://morezilla.net
 * MIT Licensed.
 */
(function () {
    'use strict';

    var temploo;

    function replace(str, arg1, arg2) {
        return str.replace(arg1, arg2);
    }

    /**
     * makeFlatString
     * removes tabs, and enter chars and trim the string.
     *
     * @param str: string
     * @returns {string}
     */
    function makeStringFlat(str) {
        var trimTokens = str.split(/[\t\r\n]/g);
        for(var i = 0; i < trimTokens.length; i++) {
            trimTokens[i] = trimTokens[i].trim();
        }
        str = trimTokens.join('');
        return replace(str, /[\t\r\n]/g, ' ');
    }

    /**
     * makeFunctionString
     * Since temploo is using Function, we need to feed the function with proper string.
     * this function takes the string and converts it another string which can be passed to
     * new Function.
     *
     * @param str: string
     * @returns {string}
     */
    function makeFunctionString(str) {
        return 'var str="' + replace(str, /"/g, '\\"') + '";return str;';
    }

    /**
     * convertAllValues
     * this function finds those print, or in other hands place holders, and converts them into
     * proper string which can be assigned by the object.
     *
     * @param str: string
     * @returns {string}
     */
    function convertAllValues(str) {
        return replace(str, /<%=(.*?)%>/g, '"+$1+"');
    }

    /**
     * convertAllLogicStatements
     * similar to {convertAllValues}, this function converts the logic statements to proper string which
     * Function can consumes.
     *
     * @param str
     * @returns {*}
     */
    function convertAllLogicStatements(str) {
        return replace(str, /<%(.*?)%>/g, '";$1str+="')
    }

    temploo = function (str) {
        var fn;

        str = makeStringFlat(str);
        str = makeFunctionString(str);
        str = convertAllValues(str);
        str = convertAllLogicStatements(str);

        fn = new Function(str);
        return function (model) {
            return fn.call(model);
        };
    };

    //Export the The library for Node.js and Browser.
    //for using in node, please use the following code
    // var temploo = require('./temploo-x.y.z.min.js');
    if ('undefined' !== typeof module) {
        module.exports = temploo;
    } else {
        window.temploo = temploo;
    }
}());
