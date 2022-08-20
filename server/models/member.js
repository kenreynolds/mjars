const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  callSign: { type: String, required: true },
  licenseClass: { type: String, required: true },
  membershipType: { type: String, required: true },
  title: { type: String, required: false },
  arrlMember: { type: String, required: true },
  interests: { type: String, required: false },
  memberNotes: { type: String, required: false },
});

module.exports = mongoose.model("Member", memberSchema);
