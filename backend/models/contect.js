import mongoose from "mongoose";
const contectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "available",
    },
    company: {
      type: String,
      default: "Haldoor Resutrent",
    },
    phoen: {
      type: String,
      default: "(61) 5328654",
    },
    industry: String,
    address: {
      type: String,
      default: "Mogadisho waabri Streat 4 -Somalia",
    },
    website: String,
    status: {
      type: String,
      default: "Active Partne",
    },
    note: String,
    rating: Number,

    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Email must be in valid format!",
      },
    },

    details: {
      type: String,
      require: true,
    },
    messageStatus: {
      type: String,
      required: true,
      default: "unread",
    },
  },
  { timestamps: true }
);

const contectModel = mongoose.model("contect", contectSchema);
export default contectModel;
