const mongoose=require('mongoose');
const connect=async()=>
{
    try{
        await mongoose.connect(
            process.env.MONGO_URL,
            {
           
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB Connected🎈");
    }
    catch(e)
    {
        console.log(e.message,"Error in connecting to db");
    }
    };
    //if disconnected


    mongoose.connection.on("disconnected",()=>
    {
        console.log("mongoDB disconnected");
    });

    module.exports=connect;
