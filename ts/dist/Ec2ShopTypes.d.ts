export interface GetInstancePricing {
    Cost: number;
    InstanceType: string;
    Memory: string;
    MonthlyPrice: number;
    Network: string;
    SpotPrice: string;
    Storage: string;
    VCPUS: number;
}
export interface GetInstancePricingListMatch {
    filter?: string;
    json?: string;
    sort?: string;
}
