import mongoose, { ConnectOptions } from 'mongoose';

const uri = "mongodb://root:password@127.0.0.1/"

const connectDb = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log('MongoDb connected');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
        process.exit(1);
    }
}

export default connectDb;