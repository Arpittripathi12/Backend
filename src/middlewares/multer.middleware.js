import multer  from "multer";

const storage=multer.diskStorage({
    destination:function(res,file,cb){
        cb(null,"./public/temp")
    },
    filename:function(req,file,cb){
        // const uniqueSuffix=Date.now() + '-'+Math.round
        // (Math.random()*1E9)   Used for uniquely storing file name
        cb(null,file.originalname)
        // originalname ki jagah ye bhi rakh sakte hai fieldname+'-'+uniqueSuffix
    }
})
export const upload=multer({storage:storage})