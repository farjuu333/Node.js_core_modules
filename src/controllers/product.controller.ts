
import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
const productController =async(req : IncomingMessage,res : ServerResponse)=>{
    // /products -> GET,POST,PUT

    const url = req.url
    const method = req.method
    // console.log(url)
    const urlParams=url?.split("/")
    // console.log(urlParams)
    const id = urlParams && urlParams[1]==="products"? Number(urlParams[2]) : null
    // console.log(id)



    // get all products
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
    else if(method==="GET" && id !== null){

         const products = productService()
         const product = products.find((p:IProduct)=>p.id === id)
          if(!product){

res.writeHead(404,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products not found!!",
        // data:newProduct,
    }));
        
    }


         res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products retrived successfully!!",
        data:product,
    }))
}
    else if(method === "POST" && url === "/products"){
        const body =await bodyParser(req)
        // console.log(body)
        const newProduct ={
            id:Date.now(),
            ...body
        }

        // console.log(newProduct)

        const products = productService();
        products.push(newProduct)

        createProduct(products);

     res.writeHead(201,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products created successfully!!",
        data:newProduct,
    }));

} else if (method === "PUT" && id !==null ){
    const body =await bodyParser(req)
     const products = productService();
     const index = products.findIndex((p:IProduct)=>p.id===id)
    //  console.log(index)

    if(index < 0){

res.writeHead(404,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products not found!!",
        // data:newProduct,
    }));
        
    }

    // console.log(products[index])

    products[index]={id : products[index].id,...body}
     createProduct(products);

     res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products updated successfully!!",
        data:products[index],
    }));

}
  else if(method === "DELETE" && id !==null){
     const products = productService();

     const index = products.findIndex((p:IProduct)=>p.id===id)
    //  console.log(index)

    if(index < 0){

res.writeHead(404,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products not found!!",
        // data:newProduct,
    }));
        
    }
    //   const arr = ["a","b","c"]
    // //   console.log(arr.splice(2,1))
    //   arr.splice(2,1)
    //   console.log(arr) 

    products.splice(index,1)
    createProduct(products);

     res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"Products deleted successfully!!",
        
    }));

  }

    }
     



export default productController;