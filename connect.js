import mongoose from "mongoose";

async function connectDB(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return mongoose.connection;
    } catch (error) {
        process.exit(1);
    }
}

export default connectDB;