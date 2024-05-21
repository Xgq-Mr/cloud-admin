


// 商品列表请求参数
export type ListParamsType = {
    current: number;
    keyword: string;
    size: number;
    status: number|string;
    [property: string]: any;
}
// 列表返回参数限制
export type ListResponseType = {
    code: number;
    data: Data;
    message: string;
    [property: string]: any;
}

export type Data = {
    records: Record[];
    total: number;
    [property: string]: any;
}

export type Record = {
    address: string;
    brand: string;
    categoryId: number;
    categoryName: string;
    code: number;
    cost: number;
    createTime: string;
    discountPrice: number;
    goodsDetail: string;
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    quickCode: string;
    remark: string;
    score: number;
    sort: number;
    specsName: string;
    status: number;
    stockNum: number;
    unitName: string;
    updateTime: string;
    [property: string]: any;
}

// 添加商品请求参数
export type AddGoodsParamsType = {
    /**
     * 商品产地
     */
    address: string;
    /**
     * 品牌名称
     */
    brand: string;
    // 商品分类
    categoryId: number | null;
    categoryName?: string;
    /**
     * 商品编码
     */
    code: number|null;
    /**
     * 成本价格
     */
    cost: number|null;
    createTime?: string;
    /**
     * 商品特价
     */
    discountPrice: number|null;
    /**
     * 富文本描述
     */
    goodsDetail: string;
    id: number;
    /**
     * 商品主图
     */
    imageUrl: string;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 销售价格
     */
    price: number|null;
    /**
     * 商品简码
     */
    quickCode: string;
    /**
     * 描述信息
     */
    remark: string;
    /**
     * 获取积分
     */
    score: number|null;
    /**
     * 排序号
     */
    sort: number;
    /**
     * 商品规格
     */
    specsName: string;
    /**
     * 商品状态
     */
    status: number;
    /**
     * 库存数量
     */
    stockNum: number|null;
    /**
     * 商品单位
     */
    unitName: string;
    updateTime?: string;
  
}

// 级联数据返回参数
export type SelectGoodsType = {
    code: number;
    data: Datum3[];
    message: string;
    [property: string]: any;
}

export type Datum3 = {
    categoryId: number;
    categoryName: string;
    [property: string]: any;
}