import { GetInstancePricingEntity } from './entity/GetInstancePricingEntity';
export type * from './Ec2ShopTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { Ec2ShopEntityBase } from './Ec2ShopEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class Ec2ShopSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GetInstancePricing(entopts?: Record<string, any>): GetInstancePricingEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): Ec2ShopSDK;
    tester(testopts?: any, sdkopts?: any): Ec2ShopSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof Ec2ShopSDK;
export { stdutil, config, BaseFeature, Ec2ShopEntityBase, Ec2ShopSDK, SDK, };
export type { DirectResult };
