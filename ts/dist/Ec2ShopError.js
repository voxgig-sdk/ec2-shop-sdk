"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ec2ShopError = void 0;
class Ec2ShopError extends Error {
    isEc2ShopError = true;
    sdk = 'Ec2Shop';
    code;
    ctx;
    status = -1;
    result;
    spec;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        // Reachable for a debugger, invisible to a serialiser: the context holds
        // the live spec and options, and an error is what gets logged.
        Object.defineProperty(this, 'ctx', { value: ctx, enumerable: false, writable: true });
    }
    // What makeError attached is already cleaned; the context is not part of
    // the record.
    toJSON() {
        return {
            sdk: this.sdk,
            code: this.code,
            message: this.message,
            status: this.status,
            result: this.result,
            spec: this.spec,
        };
    }
}
exports.Ec2ShopError = Ec2ShopError;
//# sourceMappingURL=Ec2ShopError.js.map