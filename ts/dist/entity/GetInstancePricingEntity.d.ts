import { Ec2ShopEntityBase } from '../Ec2ShopEntityBase';
import type { Ec2ShopSDK } from '../Ec2ShopSDK';
import type { Control } from '../types';
import type { GetInstancePricing, GetInstancePricingListMatch } from '../Ec2ShopTypes';
declare class GetInstancePricingEntity extends Ec2ShopEntityBase<GetInstancePricing> {
    constructor(client: Ec2ShopSDK, entopts: any);
    make(this: GetInstancePricingEntity): GetInstancePricingEntity;
    list(this: any, reqmatch?: GetInstancePricingListMatch, ctrl?: Control): Promise<GetInstancePricingEntity[]>;
}
export { GetInstancePricingEntity };
