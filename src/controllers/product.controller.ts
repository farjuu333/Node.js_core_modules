
import type { IncomingMessage, ServerResponse } from "http";
import { productService } from "../service/product.service";
const productController =(req : IncomingMessage,res : ServerResponse)=>{
    // /products -> GET,POST,PUT

    const url = req.url
    const method = req.method

    if(url==="/products"&& method === "GET"){
        // const products = [
        //     {
        //         id:1,
        //         name:"watch",
        //         price:20,
        //     },
        //      {
        //         id:2,
        //         name:"t-shirt",
        //         price:40,
        //     },
        // ]

        const products = productService()

         res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products retrived successfully!!",
        data:products,
    }))

    }
     

};

export default productController;