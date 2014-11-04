/**
 * Temploo.js: Tiny framework for HTML template
 * version: 0.1.2
 *
 * Author: Ali Najafizadeh
 * More Info: github.com/alinz/temploo.js
 *
 * MIT Licensed.
 */
function Template() {
    this.CHAR_RETURN = "________RETURN________";
    this.CHAR_ENTER = "________ENTER________";
    this.CHAR_TAB = "________TAB________";
    this.CONVERT_REFEX = /[\r\n\t]|(________RETURN________)|(________ENTER________)|(________TAB________)/g;
}

Template.prototype.compile = function (str) {
    var that = this,
        fn;

    str = this.toTemplate(str);
    str = this.makeFunctionString(str);
    str = this.convertAllValues(str);
    str = this.convertAllLogicStatements(str);

    fn = new Function(str);
    return function (model) {
        if (model.summary && model.summary.length > 0) {
            console.log(JSON.stringify(model, null, 4));
        }
        var result = fn.call(model);
        return that.fromTemplate(result);
    };
};

Template.prototype.replace = function (str, arg1, arg2) {
    return str.replace(arg1, arg2);
};

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
Template.prototype.toTemplate = function (str) {
    var that = this;
    return this.replace(str, this.CONVERT_REFEX, function (value) {
        switch (value) {
            case "\n":
                return that.CHAR_ENTER;
            case "\r":
                return that.CHAR_RETURN;
            case "\t":
                return that.CHAR_TAB;
            default:
                return that.value;
        }
    });
};

Template.prototype.fromTemplate = function (str) {
    var that = this;
    return this.replace(str, this.CONVERT_REFEX, function (value) {
        switch (value) {
            case that.CHAR_ENTER:
                return "\n";
            case that.CHAR_RETURN:
                return "\r";
            case that.CHAR_TAB:
                return "\t";
            default:
                return that.value;
        }
    });
};

/**
 * makeFunctionString
 * Since temploo is using Function, we need to feed the function with proper string.
 * this function takes the string and converts it another string which can be passed to
 * new Function.
 *
 * @param str: string
 * @returns {string}
 */
Template.prototype.makeFunctionString = function (str) {
    return 'var str="' + this.replace(str, /"/g, '\\"') + '";return str;';
};

/**
 * convertAllValues
 * this function finds those print, or in other hands place holders, and converts them into
 * proper string which can be assigned by the object.
 *
 * @param str: string
 * @returns {string}
 */
Template.prototype.convertAllValues = function (str) {
    return this.replace(str, /<%=(.*?)%>/g, '"+$1+"');
};

/**
 * convertAllLogicStatements
 * similar to {convertAllValues}, this function converts the logic statements to proper string which
 * Function can consumes.
 *
 * @param str
 * @returns {*}
 */
Template.prototype.convertAllLogicStatements = function (str) {
    return this.replace(str, /<%(.*?)%>/g, '";$1str+="')
};
