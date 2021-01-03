"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDateFormatter = void 0;
var angular_calendar_1 = require("angular-calendar");
var common_1 = require("@angular/common");
var CustomDateFormatter = /** @class */ (function (_super) {
    __extends(CustomDateFormatter, _super);
    function CustomDateFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomDateFormatter.prototype.dayViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new common_1.DatePipe(locale).transform(date, 'HH:mm', locale);
    };
    CustomDateFormatter.prototype.weekViewHour = function (_a) {
        var date = _a.date, locale = _a.locale;
        return this.dayViewHour({ date: date, locale: locale });
    };
    CustomDateFormatter.prototype.dayViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        return new common_1.DatePipe(locale).transform(date, 'dd. MMMM yyyy', locale);
    };
    CustomDateFormatter.prototype.weekViewTitle = function (_a) {
        var date = _a.date, locale = _a.locale;
        var _b = angular_calendar_1.getWeekViewPeriod(this.dateAdapter, date, 1, [], 0), viewStart = _b.viewStart, viewEnd = _b.viewEnd;
        console.log(this.dateAdapter.startOfWeek(date, { weekStartsOn: 1 }));
        var format = function (dateToFormat, showYear) {
            return new Intl.DateTimeFormat(locale, {
                month: 'short',
                day: 'numeric',
                year: showYear ? 'numeric' : undefined,
            }).format(dateToFormat);
        };
        return format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()) + " - " + format(viewEnd, true);
    };
    return CustomDateFormatter;
}(angular_calendar_1.CalendarDateFormatter));
exports.CustomDateFormatter = CustomDateFormatter;
//# sourceMappingURL=CustomDateFormatter.js.map