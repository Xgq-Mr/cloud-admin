

// 用户列表请求参数
export type userParamsType = {
    current: number;
    keyword?: string;
    size: number;
    [property: string]: any;
}
// 用户列表响应参数
export type userResponseType = {
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
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    createTime: string;
    credentialsNonExpired: boolean;
    email: string;
    id: number;
    imageUrl: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    updateTime: string;
    username: string;
    [property: string]: any;
}

// 添加用户请求参数
export type addUSerParamsType = {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    email: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    username: string;
}

// 分配角色列表响应参数
export type RoleResponseType = {
    code: number;
    data: Datum3[];
    message: string;
}

export type Datum3 = {
    id: number;
    roleName: string;
}

// 编辑角色请求参数
export type editUserType = {
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    createTime?: string;
    credentialsNonExpired: boolean;
    email: string;
    id?: number;
    imageUrl?: string;
    mobile: string;
    nickName: string;
    password: string;
    remark: string;
    roleIds: number[];
    updateTime?: string;
    username: string;
}

/**
 * 重置密码参数
 */
export type resetPassType = {
    newPassword: string;
    repPassword: string;
    userId: number|string;
}