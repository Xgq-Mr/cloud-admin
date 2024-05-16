
/**
 * 列表请求参数
 * Request
 */
export type ParamsRoleListType = {
    current: number;
    name: string;
    size: number;
    [property: string]: any;
}

/**
 * 列表响应参数
 * Request
 */
export type ResponseRoleListType = {
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
    createTime: string;
    id: number;
    remark: string;
    roleCode: string;
    roleName: string;
    status: boolean;
    updateTime: string;
    [property: string]: any;
}


// 新增角色请求参数
export type AddParams = {
    remark: string;
    roleCode: string;
    roleName: string;
    status: boolean;
    [property: string]: any;
}
