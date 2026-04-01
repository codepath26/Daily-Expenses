import mongoose from "mongoose";

const DBConnection = async() => {
    try{
        const URL : string | undefined = process.env.DB_URL;
        if(!URL){
            throw new Error("DB_URL is not defined in environment variables.")
        }
        await mongoose.connect(URL);
        console.log("DB Connected Successfully.")

    }catch(error : unknown){
        if(error instanceof Error){
            console.log(error.message);
        }else{
            console.log(error);
        }
        process.exit(1)
    }
}

export default DBConnection;