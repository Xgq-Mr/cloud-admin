
// 永久缓存封装
export const Local = {
    set(key:string,value:any){
        localStorage.setItem(key,JSON.stringify(value || ""))
    },
    get(key:string){
        return JSON.parse(localStorage.getItem(key) || "")
    },
    remove(key:string){
        localStorage.removeItem(key)
    },
    clear(){
        localStorage.clear()
    }
}

// 会话存储封装
export const Session = {
    set(key:string,value:any){
        sessionStorage.setItem(key,JSON.stringify(value || ""))
    },
    get(key:string){
        return JSON.parse(sessionStorage.getItem(key) || "")
    },
    remove(key:string){
        sessionStorage.removeItem(key)
    },
    clear(){
        sessionStorage.clear()
    }
}