import moment from "moment";

export class DateTime {
    dateTime: moment.Moment;

    constructor(dateTime?: string) {
        this.dateTime = moment(dateTime);
    }

    format(format: string) {
        return this.dateTime.format(format);
    }

    toCommonFormat() {
        return this.dateTime.format('YYYY-MM-DD HH:mm:ss');
    }

    toISOString() {
        return this.dateTime.format();
    }
}