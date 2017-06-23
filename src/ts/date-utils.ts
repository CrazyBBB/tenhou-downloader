export class DateHourStrIterator {
    private date: Date;
    constructor(initialDateHourStr: string) {
        const year: string  = initialDateHourStr.substring(0, 4);
        const month: string = initialDateHourStr.substring(4, 6);
        const day: string   = initialDateHourStr.substring(6, 8);
        const hour: string  = initialDateHourStr.substring(8, 10);
        this.date = new Date(year + '/' + month + '/' + day + ' ' + hour + ':00');
    }

    public nextStr(): string {
        const year: string  = '' + this.date.getFullYear();
        const month: string = ('0' + (this.date.getMonth() + 1)).slice(-2);
        const day: string   = ('0' + this.date.getDate()).slice(-2);
        const hour: string  = ('0' + this.date.getHours()).slice(-2);

        this.date.setHours(this.date.getHours() + 1);

        return year + month + day + hour;
    }
}

export class DateStrIterator {
    private date: Date;
    constructor(initialDateStr: string) {
        const year: string  = initialDateStr.substring(0, 4);
        const month: string = initialDateStr.substring(4, 6);
        const day: string   = initialDateStr.substring(6, 8);
        this.date = new Date(year + '/' + month + '/' + day);
    }

    public nextStr(): string {
        const year: string  = '' + this.date.getFullYear();
        const month: string = ('0' + (this.date.getMonth() + 1)).slice(-2);
        const day: string   = ('0' + this.date.getDate()).slice(-2);

        this.date.setDate(this.date.getDate() + 1);

        return year + month + day;
    }
}