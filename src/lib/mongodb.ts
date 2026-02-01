import mongoose from 'mongoose';
import Doctor from '@/models/Doctor';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function getDoctors() {
  await connectDB();
  const doctorList = await Doctor.find({})
  .sort({ name: 1 }).lean()
  const doctors = doctorList.map((doc) => ({
    _id: doc._id.toString(),
    name: doc.name,
    city: doc.city,
    area: doc.area,
    profession: doc.profession,
    contact: doc.contact,
    instagram: doc.instagram,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
  return doctors;
}
