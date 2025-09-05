class ApiResponse{

    constructor(statusCode,data,message="Success"){

        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success=statusCode<400
    }
}
// Whenever you send a response from your backend to frontend, instead of sending raw JSON, you wrap it in this class.
// ApiResponse is just a neat way to send well-structured, consistent responses from your API, instead of 
// sending random JSON each time.
export {ApiResponse}