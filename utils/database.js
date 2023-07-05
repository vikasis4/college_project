import mongoose from 'mongoose';

let isConnected = false;

export const connectToDb = async () => {
    
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    await mongoose.connect(process.env.MONGOOSE_URI, {
        dbName: "nit_kkr_db",
        useNewUrlParser: true,
    })

    isConnected = true;
    console.log("MongoDB connected");
}