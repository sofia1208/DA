"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Printing = /** @class */ (function () {
    function Printing(router) {
        this.router = router;
        this.active = false;
    }
    Printing.prototype.printDoct = function (docutmentName, documentData) {
        this.active = true;
        this.router.navigate(['/', {
                outlets: {
                    'print': ['print', docutmentName, documentData.join()]
                }
            }]);
    };
    Printing.prototype.onDataReady = function () {
        var _this = this;
        setTimeout(function () {
            window.print();
            _this.active = false;
            _this.router.navigate([{ outlets: { print: null } }]);
        });
    };
    return Printing;
}());
exports.Printing = Printing;
//# sourceMappingURL=Printing.js.map