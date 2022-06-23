import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connected error ' + error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

export function getDB(url) {
    try {
        mongoose.connect(url);    
        return mongoose;
    } catch (error) {
        console.log("Unable to connect");
        console.log(error);
    } 
}