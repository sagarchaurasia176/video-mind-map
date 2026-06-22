export class AppError extends Error{
    statusCode : number;
    constructor(message:string, statusCode=500){
        super(message)
        this.statusCode  = statusCode;
    }   
}


//op : throw new AppError("hello" , 200); 