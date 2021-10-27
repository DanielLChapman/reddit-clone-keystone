import convertDateFromNow from "../../lib/convertDateFromNow";

describe('convertDateFromNow', () => {
    it('accurate returns seconds ago', () => {
        let date = Date.now();

        expect(convertDateFromNow(date)).toEqual("0 minutes ago");

        date = `Mon Jun 14 ${new Date().getFullYear()-5} 15:56:11 GMT-0400 (Eastern Daylight Time)`;
        expect(convertDateFromNow(date)).toEqual("5 years ago");

        date = new Date();
        date.setMonth(date.getMonth() - 1);

        expect(convertDateFromNow(date)).toEqual("1 month ago");

        date = new Date();
        date.setHours(date.getHours() - 1);

        expect(convertDateFromNow(date)).toEqual("1 hour ago");

        date = new Date();
        date.setHours(date.getHours() - 5);

        expect(convertDateFromNow(date)).toEqual("5 hours ago");
    })
})