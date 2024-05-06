
import Mock from "mockjs"

const data = Mock.mock({
    // list 的数组中有5个元素
    "list|5":[
        {
            // 表示 id 从1开始自增
            "id|+1":1,
            // 返回2/5几率的布尔值true 默认不传参参数几率各50%
            "status":"@boolean(2,3,true)",
            // 返回一个1-10之间的随机数
            num:"@natural(1,10)",
            // 返回一个1-100之间1-3位的浮点数
            floatNum:"@float(1,100,1,3)",
            // 返回一个3-7位的随机字符串 从'lower' 字符池里面随机出
            str:"@string('lower',3,10)",
            // 返回一个数组 1-20 数字 步长为5
            arr:"@range(1,20,5)",
            // 随机事件 yyyy年/MM月/dd日
            date:"@date('yyyy/MM/dd')",
            // 现在时间
            now:"@now()",
            // Random.image( size?, background?, foreground?, format?, text? ) 生成一个随机图片地址
            image:"@image()",
            // 随机生成 3-5 段字符串类型文本
            // text:"@paragraph(3,5)",
            // 随机生成 3-5 段中文类型文本
            cText:"@cparagraph(3,5)",
            // 随机生成一段中文标题 3-10 个中文字符
            cTitle:"@ctitle(3,10)",
            // 随机生成url 第一个参数可以指定域名 第二个参数为端口号
            url:"@url()",
            // 随机身份证号
            "idCard|18":"@id()",
            // 自增整数 默认第一个为1  参数为步长
            setp:"@increment(100)",
        }
    ]
})

console.log(JSON.stringify(data,null,4));