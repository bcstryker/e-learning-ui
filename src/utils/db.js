import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = { /* your mongoose connection options */ };
    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then(mongoose => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}