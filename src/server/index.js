import http from "http"

const prot = 3465
const server = http.createServer((req, res) => {
     res.end(
        JSON.stringify([
            {name:"ls",age:18},
            {name:"zs",age:19}
        ])
    )
})
server.listen(prot)