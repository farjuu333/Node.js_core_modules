import type { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import productController from "../controllers/product.controller";
import courseController from "../controllers/course.controller";

const routeHandler =(req : IncomingMessage,res : ServerResponse)=>{
const url = req.url;   
const method = req.method;

if(url === "/" && method === "GET"){
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is root route"}))

}else if(url?.startsWith("/products")){
   productController(req,res);
}
else if (url?.startsWith("/courses")){
 courseController(req,res);
}

else{
     res.writeHead(404,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This route is not defined"}))
// console.log("This route is not defined");

}
}

export default routeHandler;