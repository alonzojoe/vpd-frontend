export interface PoolHeader {
    id: number;
    protocol_no: string;
}

export interface RootState {
    data: {
        poolCart: any[],
        poolHeaders: any[],
        poolDetails: any[],
        poolHeader: any,
        poolMethodMeasles: any[],
        poolKitMeasles: any[]
    }
}