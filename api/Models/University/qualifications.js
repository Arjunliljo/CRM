import mongoose from "mongoose";

const qualificationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Qualification must have a name"],
  },
  mark: {
    type: Number,
    required: [true, "Qualification must have a mark"],
  },
});

const Qualification = mongoose.model("Qualification", qualificationSchema);

export default Qualification;
