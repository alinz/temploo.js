/** @preserve Temploo.js: Tiny framework for HTML template
 * version: 0.1.1
 *
 * NOTE: Make sure your document's has <meta charset="utf-8">
 *
 * By Ali Najafizadeh
 * MIT Licensed.
 */
(function () {
    'use strict';

    var temploo,
        //The folloing varibales are used for convert function.
        CHAR_RETURN = "¼",
        CHAR_ENTER = "½",
        CHAR_TAB = "¾",
        CONVERT_REFEX = /[\r\n\t¼½¾]/g;

    function replace(str, arg1, arg2) {
        return str.replace(arg1, arg2);
    }

    /**
     * convert
     * this function convert special characters to ecoded_one and convert it back once it's done.
     *
     * NOTE: in order to make this function to work, the document needs to be utf-8 because this function
     * is using the some special chars.
     *
     * @param str: string
     * @returns {string}
     */
    function convert(str) {
        return replace(str, CONVERT_REFEX, function (value) {
            switch (value) {
                case CHAR_ENTER:
                    return "\n";
                case CHAR_RETURN:
                    return "\r";
                case CHAR_TAB:
                    return "\t";
                case "\r":
                    return CHAR_RETURN;
                case "\n":
                    return CHAR_ENTER;
                case "\t":
                    return CHAR_TAB;
                default:
                    return value;
            }

        });
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

        str = convert(str);
        str = makeFunctionString(str);
        str = convertAllValues(str);
        str = convertAllLogicStatements(str);

        fn = new Function(str);
        return function (model) {
            var result = fn.call(model);
            return convert(result);
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