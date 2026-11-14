import type { IncomingMessage, ServerResponse } from "http";
import { json } from "stream/consumers";
import productController from "../controllers/product.controller";

const routeHandler =(req : IncomingMessage,res : ServerResponse)=>{
const url = req.url;   
const method = req.method;

if(url === "/" && method === "GET"){
    // console.log("This is root route");
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is root route"}))

}else if(url?.startsWith("/products")){

    // product->GET,PUT,POST

   productController(req,res);

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
}

export default routeHandler;