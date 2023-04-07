// import mongoose from 'mongoose';

// const otpSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   otp: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now, expires: 60 }, // expires after 10 minutes
// });

// const Otp = mongoose.model('Otp', otpSchema);

// // To create a new OTP document
// const newOtp = new Otp({
//   email: 'user@example.com',
//   otp: '123456',
// });
// await newOtp.save();