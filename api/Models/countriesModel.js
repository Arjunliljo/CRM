import mongoose from "mongoose";

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Country must have a name"],
      unique: true,
    },
    code: {
      type: String,
      required: [true, "Country must have a code"],
      unique: true,
    },
    flag: {
      type: String,
      default:
        "https://cbbstwltufvzpsqvnahz.supabase.co/storage/v1/object/public/avatars/public/logoipsum.png",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// return the Country model using the provided database connection
const getCountryModel = (dbConnection) => {
  return dbConnection.model("Country", countrySchema);
};

export default getCountryModel;
