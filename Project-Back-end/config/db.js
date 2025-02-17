const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.Mongo_URL)
        console.log(`Mongodb connected  ${conn.connection.host}`)
    }
    catch(error){
        console.error(`Error :  ${error.messsage}`)
        process.exit(1)
    }
}
module.exports = connectDb ;