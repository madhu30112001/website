import jwt from "jsonwebtoken"

const authmiddleware=async(req,res,next)=>{
            const{token}=req.headers;
            if(!token){
                return res.json({success:false,message:"Not Authorized, please login again"})
            }
            try {
                const token_decode=jwt.verify(token,process.env.JWT_SECRET)
                console.log(token_decode);
                req.body.userId=token_decode.id;
                next();
                
            } catch (error) {
                console.log(error);
                res.json({success:false,message:"Error"})
                
            }



}
const storage= multer.diskStorage({
    destination: './Uploads',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Renaming the file
    },
  });
export {authmiddleware,storage}