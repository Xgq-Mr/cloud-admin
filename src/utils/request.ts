// 引入axios
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  type Method
} from "axios";

// 创建axios实例
const http: AxiosInstance = axios.create({
  baseURL : import.meta.env.VITE_APP_BASE_API,
  // baseURL: "https://mock.mengxuegu.com/mock/6638b9ffcab9671f88bd312d/api",
  timeout: 5000,
});

// 请求拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

type DataType<T = any> ={
  code:number,
  message:string,
  status:string,
  data:T
}

// 封装request方法
const request = <T = any>(url: string, method:Method = "GET", data:Object = {},options?:AxiosRequestConfig) => {
  return http.request<T,DataType<T>>({
    url,
    method,
    [method === "GET" ? "params" : "data"]: data,
    ...options
  });
};

// get
const get = <T = any>(url:string,data={})=> request<T>(url,"GET",data)

// post
const post = <T = any>(url:string,data={})=> request<T>(url,"POST",data)

// put 
const put = <T = any>(url:string,data={})=> request<T>(url,"PUT",data)

// delete
const del = <T = any>(url:string,data={})=> request<T>(url,"DELETE",data)
// 导出
export default request;
