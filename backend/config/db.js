import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://burakpekisik:FEP2waKZAoBbnrsy@cluster0.ovs9g.mongodb.net/food-delivery"
    )
    .then(() => {
      console.log("DB Connected");
    });
};
