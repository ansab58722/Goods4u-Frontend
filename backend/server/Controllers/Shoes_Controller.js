import mongoose from "mongoose";
import Shoes_schema from "../Schemas/Shoes_schema.js";

export const getAllShoes = async (req, res) => {
  try {
    await mongoose.connect(process.env.mongo_db_url);
    const shoes = await Shoes_schema.find({});
    
    return res.status(200).json({
      statusCode: 200,
      status: "Success",
      data: shoes
    });
  } catch (error) {
    console.error("Error fetching shoes:", error);
    return res.status(500).json({
      statusCode: 500,
      status: "Failed",
      Details: "Internal server error occurred while fetching shoes",
      error: error.message
    });
  } finally {
    await mongoose.connection.close();
  }
}; 