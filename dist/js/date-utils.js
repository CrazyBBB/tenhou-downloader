"use strict";
exports.__esModule = true;
var DateHourStrIterator = (function () {
    function DateHourStrIterator(initialDateHourStr) {
        var year = initialDateHourStr.substring(0, 4);
        var month = initialDateHourStr.substring(4, 6);
        var day = initialDateHourStr.substring(6, 8);
        var hour = initialDateHourStr.substring(8, 10);
        this.date = new Date(year + '/' + month + '/' + day + ' ' + hour + ':00');
    }
    DateHourStrIterator.prototype.nextStr = function () {
        var year = '' + this.date.getFullYear();
        var month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        var day = ('0' + this.date.getDate()).slice(-2);
        var hour = ('0' + this.date.getHours()).slice(-2);
        this.date.setHours(this.date.getHours() + 1);
        return year + month + day + hour;
    };
    return DateHourStrIterator;
}());
exports.DateHourStrIterator = DateHourStrIterator;
var DateStrIterator = (function () {
    function DateStrIterator(initialDateStr) {
        var year = initialDateStr.substring(0, 4);
        var month = initialDateStr.substring(4, 6);
        var day = initialDateStr.substring(6, 8);
        this.date = new Date(year + '/' + month + '/' + day);
    }
    DateStrIterator.prototype.nextStr = function () {
        var year = '' + this.date.getFullYear();
        var month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        var day = ('0' + this.date.getDate()).slice(-2);
        this.date.setDate(this.date.getDate() + 1);
        return year + month + day;
    };
    return DateStrIterator;
}());
exports.DateStrIterator = DateStrIterator;
