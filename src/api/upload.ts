
import request from "@/utils/request"
// 上传图片接口
export const upLoadApi = (data:any) => request("/system/media/upload/img","POST",data,{
    headers:{
        "Content-Type":"multipart/form-data"
    }
})