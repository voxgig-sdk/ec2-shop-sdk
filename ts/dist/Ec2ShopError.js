"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ec2ShopError = void 0;
class Ec2ShopError extends Error {
    isEc2ShopError = true;
    sdk = 'Ec2Shop';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.Ec2ShopError = Ec2ShopError;
//# sourceMappingURL=Ec2ShopError.js.map