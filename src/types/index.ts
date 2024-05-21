
// 首页接口参数
/**
 * 营业数据统计响应参数
 */
export type StatisticsType = {
    code: number;
    data: Data;
    message: string;
    [property: string]: any;
}

export type Data = {
    totalIncomeMoney: number;
    totalOrderNum: number;
    totalReturnedMoney: number;
    totalSaleMoney: number;
    [property: string]: any;
}

// 分类销售统计响应参数
/**
 * Request
 */
export type CategoryDataType = {
    code: number;
    data: Datum[];
    message: string;
    [property: string]: any;
}

export type Datum = {
    name: string;
    value: number;
    [property: string]: any;
}


// 30天销售趋势响应参数 SaleData
/**
 * Request
 */
export type SaleDataType = {
    code: number;
    data: Data2;
    message: string;
    [property: string]: any;
}

export type Data2 = {
    last30Days: string[];
    orderNumList: number[];
    rechargeMoneyList: number[];
    returnMoneyList: number[];
    saleMoneyList: number[];
    [property: string]: any;
}

// 会员消费top10响应参数
/**
 * Request
 */
export type MemberType = {
    code: number;
    data: Datum2[];
    message: string;
    [property: string]: any;
}

export type Datum2 = {
    consumeMoney: number;
    name: string;
    [property: string]: any;
}