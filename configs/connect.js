import mongoose from "mongoose";


const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
