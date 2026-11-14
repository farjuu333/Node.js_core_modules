import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { json } from "stream/consumers";

const server : Server = createServer((req : IncomingMessage,res : ServerResponse)=>{
//  console.log("Request : ",req);
//   console.log("Response : ",res);
// console.log(req.url);
// console.log(req.method);

const url = req.url;   
const method = req.method;

if(url === "/" && method === "GET"){
    // console.log("This is root route");
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is root route"}))

}else if(url?.startsWith("/products")){

     res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is products route"}))


}
else if (url?.startsWith("/courses")){
 res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is courses route"}))
}

else{
     res.writeHead(404,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This route is not defined"}))
// console.log("This route is not defined");

}
})

server.listen(5000,()=>{
    console.log("server is running successfully!!");
})