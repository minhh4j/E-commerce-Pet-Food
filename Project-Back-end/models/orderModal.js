const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
   
    totalAmount: {
      type: Number,
      required: true,
      set: (v) => Math.round(v),
    },
    DeliveryDate: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      },
    },
    paymantDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "pending", "cancelled"],
    },
    razorpayPaymentId: {
      type: String, 
    },
    razorpayOrderId:{
      type:String
    },
    razorpayPaymentStatus: {
      type: String, 
      enum: ['paid', 'failed', 'pending', 'captured', 'refunded'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
