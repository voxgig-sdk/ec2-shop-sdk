import { Context } from './Context';
declare class Ec2ShopError extends Error {
    isEc2ShopError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { Ec2ShopError };
