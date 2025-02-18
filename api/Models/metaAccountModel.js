import mongoose from "mongoose";

const metaAccountSchema = mongoose.Schema(
  {
    accountId: {
      type: String,
      required: [true, "Meta account must have a accountId"],
    },
    accessToken: {
      type: String,
      required: [true, "Meta account must have a accessToken"],
    },
    appId: {
      type: String,
    },
    appSecret: {
      type: String,
    },
    appName: {
      type: String,
    },
    longLivedAccessToken: {
      type: String,
    },
    expiresIn: {
      type: Number,
    },
    accountName: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const MetaAccount = mongoose.model("MetaAccount", metaAccountSchema);

export default MetaAccount;
