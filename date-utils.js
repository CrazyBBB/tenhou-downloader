exports.DateHourStrIterator = (function() {
    const DateHourStrIterator = function(initialDateHourStr) {
        const year  = initialDateHourStr.substring(0, 4);
        const month = initialDateHourStr.substring(4, 6);
        const day   = initialDateHourStr.substring(6, 8);
        const hour  = initialDateHourStr.substring(8, 10);
        this.date = new Date(year + '/' + month + '/' + day + ' ' + hour + ':00');
    }

    DateHourStrIterator.prototype.nextStr = function() {
        const year  = this.date.getFullYear();
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        const day   = ('0' + this.date.getDate()).slice(-2);
        const hour  = ('0' + this.date.getHours()).slice(-2);

        this.date.setHours(this.date.getHours() + 1);

        return year + month + day + hour;
    }

    return DateHourStrIterator;
})();

exports.DateStrIterator = (function() {
    const DateStrIterator = function(initialDateStr) {
        const year  = initialDateStr.substring(0, 4);
        const month = initialDateStr.substring(4, 6);
        const day   = initialDateStr.substring(6, 8);
        this.date = new Date(year + '/' + month + '/' + day);
    }

    DateStrIterator.prototype.nextStr = function() {
        const year  = this.date.getFullYear();
        const month = ('0' + (this.date.getMonth() + 1)).slice(-2);
        const day   = ('0' + this.date.getDate()).slice(-2);

        this.date.setDate(this.date.getDate() + 1);

        return year + month + day;
    }

    return DateStrIterator;
})();