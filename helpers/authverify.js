const { resetWatchers } = require("nodemon/lib/monitor/watch");
const {tokenValidator} = require("../helpers/token.js");


module.exports = async function(req,res,next){
    try{
    const header = req.headers['x-access-token'] || res.headers["authorization"]
    if(header) {
        const valid = await tokenValidator(header);
        
        if(valid){

            next();
        }else{
            return res.status(401).json('Access Denied');
        }
    } else {
        return res.status(401).json('header is missing')
    }
  
} catch(error){
        res.send(error);
    }
}

