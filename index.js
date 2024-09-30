const http=require("http")
const url=require("url")
const fs=require("fs")
const {v4:uuid4}=require("uuid")


const myServer=http.createServer((req,res)=>{
    try{
    const parsedUrl=url.parse(req.url)
    if(req.method=='GET'){
        const splitPathname=parsedUrl.pathname.split('/')
        switch(splitPathname[1]){
            case "html":
                fs.readFile("./public/index.html",(err,data)=>{
                    if(err)res.end(err)
                    else res.end(data)
                })
                break;
            case "json":
                fs.readFile("./data/data.json",'utf-8',(err,data)=>{
                    if(err)res.end(err)
                    else res.end(data)
                })
                break;
            case "uuid":
                const myUuid=uuid4()
                res.end(`genrated uuidV4 is :${myUuid}`)
                break;
            case "status":
                const currStatus=parseInt(splitPathname[2])
                if(isNaN(currStatus)||currStatus<=99||currStatus>600){
                    res.statusCode=400
                    res.end("Enter valid status code")
                    break;
                }
                res.statusCode=currStatus
                res.end(`status code set to ${currStatus}`)
                break;
            case "delay":
                const timmer=splitPathname[2]*1000
                if(isNaN(timmer)||timmer<0){
                    res.statusCode=400
                    res.end("Enter valid delaytime")
                    break;
                }
                setTimeout(()=>{
                    res.statusCode=200
                    res.end("success after "+timmer/1000+" sec")
                },timmer)
                break;
            default:
                res.statusCode=404
                res.end("404 NOT FOUND")
        }
    }else{
        res.statusCode=404
        res.end("404 Not Found")
    }} catch(error){
        res.statusCode=500
        res.end(error.message)
    }
})

myServer.listen(3001)