import mongoose from "mongoose";

const statusSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Status must have a name"],
    },
    subStatuses: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v),
        message: "Sub-status must be an array",
      },
    },
    isTab: {
      type: Boolean,
      default: false,
    },
    isCountryBased: {
      type: Boolean,
      default: false,
    },
    isApplication: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      maxlength: [100, "Description should be less than 100 characters"],
      minlength: [3, "Description should be greater than 3 characters"],
    },
    countries: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Country",
          default: "N/A",
        },
      ],
    },
    color: {
      type: String,
      default: "#000000",
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

statusSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose.model("Status").countDocuments();
    this.priority = count + 1;
  }
  next();
});

// Return the Status model using the provided database connection
const Status = mongoose.model("Status", statusSchema);

export default Status;
