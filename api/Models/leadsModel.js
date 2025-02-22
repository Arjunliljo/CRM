import mongoose from "mongoose";

const leadSchema = mongoose.Schema(
  {
    leadId: {
      type: String,
      unique: true,
      sparse: true,
    },

    leadSource: {
      type: String,
      enum: ["META", "MANUAL", "OTHER", "WHATSAPP"],
      default: "MANUAL",
    },
    name: {
      type: String,
      required: [true, "Lead must have a name"],
    },
    email: {
      type: String,
      maxlength: [30, "Email should be less than 30 characters"],
      minlength: [3, "Email should be greater than 3 characters"],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Lead must have a phone number"],
      unique: true,
    },
    campaign: {
      type: String,
    },
    attemps: {
      type: Number,
      default: 1,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      default: "67b5833fbe7074541348db91",
    },

    isStudent: {
      type: Boolean,
      default: false,
    },

    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },

    remark: {
      type: String,
      // maxlength: [100, "Remark should be less than 100 characters"],
      minlength: [3, "Remark should be greater than 3 characters"],
    },

    helpers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    documents: {
      type: [
        {
          name: {
            type: String,
            required: [true, "Document must have a name"],
          },
          filename: {
            type: String,
            required: [true, "Document must have a filename"],
          },
          url: {
            type: String,
            required: [true, "Document must have a url"],
          },
          isImportant: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },

    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],

    img: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },

    followupDate: {
      type: Date,
      default: null,
    },

    address: {
      type: String,
      default: "N/A",
    },

    qualification:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Qualification",
      default: "N/A",
    }],

  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
