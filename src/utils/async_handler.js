// using Promises
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(
        requestHandler(req, res, next)
    ).catch(next);
  };
};




// The asyncHandler function is a helper that automatically catches errors in async functions.
// Reduces the use of Try-Catch Arpit

export {asyncHandler}

// const asyncHandler=(fun)=>async(req,res,next)=>{
// try{
// await fun(req,res,next)
// }
// catch{
// res.status(err.code || 500).json({
//         success:false,
//         message:err.message
// })
// }
// }