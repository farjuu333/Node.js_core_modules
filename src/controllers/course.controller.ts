import type { IncomingMessage, ServerResponse } from "http";

const courseController =(req:IncomingMessage,res:ServerResponse)=>{
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({message:"This is courses route"}))

};

export default courseController;