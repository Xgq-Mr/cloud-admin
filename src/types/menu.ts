
// 菜单列表返回参数
export type ResponseMenuType = {
    code: number;
    data: Datum[];
    message: string;
}

export type Datum = {
    children: DatumChild[];
    code: string;
    component: null | string;
    createTime: string;
    id: string;
    meta: DatumMeta;
    name: string;
    parentId: null;
    path: string;
    redirect: null | string;
    remark: string;
    sort: number;
    type: string;
    updateTime: string;
}

export type DatumChild = {
    children: ChildChild[];
    code: string;
    component: string;
    createTime: string;
    id: string;
    meta: FluffyMeta;
    name: string;
    parentId: string;
    path: string;
    redirect: null;
    remark: string;
    sort: number;
    type: string;
    updateTime: string;
}

export type ChildChild = {
    children: string[];
    code: string;
    createTime: string;
    id: string;
    meta: PurpleMeta;
    name: null;
    parentId: string;
    path: null;
    redirect: null;
    remark: string;
    sort: number;
    type: string;
    updateTime: string;
}

export type PurpleMeta = {
    cache: boolean;
    hidden: boolean;
    icon: null;
    title: string;
}

export type FluffyMeta = {
    cache: boolean;
    hidden: boolean;
    icon: string;
    title: string;
}

export type DatumMeta = {
    cache: boolean;
    hidden: boolean;
    icon: string;
    linkTo: string;
    title: string;

}


// 级联选择器参数
export type SelectMenuType = {
    code: number;
    data: Datum2[];
    message: string;
    [property: string]: any;
}

export type Datum2 = {
    children: Child[];
    id: string;
    parentId: null;
    title: string;
    [property: string]: any;
}

export type Child = {
    children: string[];
    id: string;
    parentId: string;
    title: string;
    [property: string]: any;
}

// 新增菜单
export type AddParamsType = {
    code?: string;
    component: string;
    meta: Meta;
    name: string;
    parentId: string;
    path: string;
    redirect: string;
    remark: string;
    sort: number;
    type: string;
    [property: string]: any;
}

export type Meta = {
    cache: boolean;
    hidden: boolean;
    icon: string;
    title: string;
    [property: string]: any;
}

// 编辑菜单参数
export type EditParamsType = {
    children?: string[];
    code?: string;
    component: string;
    createTime?: string;
    id?: string;
    meta: Meta2;
    name: string;
    parentId: string;
    path: string;
    redirect: string|null;
    remark: string;
    sort: number;
    type: string;
    updateTime?: string;
    [property: string]: any;
}

export type Meta2 = {
    cache: boolean;
    hidden: boolean;
    icon: string;
    title: string;
    [property: string]: any;
}