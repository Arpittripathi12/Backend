class ApiError extends Error{

    constructor(
        statusCode,
        message="Something went Wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode=statusCode  
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors

        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export{ApiError}
// It lets you throw errors with extra info, not just a plain message.
// is class ko call kar lenge jaha bhi hme error deni hogi