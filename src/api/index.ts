import request from "../utils/request";

type resType = {
  code: number;
  status: string;
  data:Object;
  message:string;
};

type resultType = {
  result: resType[];
};

  export const test = () => request<resultType>(
  "/admin/login", 
  "POST",
  {username : "admin", password : "admin"}
);                                                                                                                                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                   