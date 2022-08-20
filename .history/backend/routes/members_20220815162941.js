const express = require("express");
const Member = require("../models/member");

const router = express.Router();

router.delete("/:id", (req, res, next) => {
  Member.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Member deleted." });
  });
});

router.get("", (req, res, next) => {
  Member.find().then((documents) => {
    res.status(200).json({
      message: "Fetched members",
      members: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Member.findById(req.params.id).then((member) => {
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ message: "Member not found!" });
    }
  });
});

router.post("", (req, res, next) => {
  const member = new Member({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    callSign: req.body.callSign,
    licenseClass: req.body.licenseClass,
    membershipType: req.body.membershipType,
    title: req.body.title,
    arrlMember: req.body.arrlMember,
    interests: req.body.interests,
    memberNotes: req.body.memberNotes,
  });

  member.save().then((addedMember) => {
    res.status(201).json({
      message: "Member added successfully",
      memberId: addedMember._id,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const member = new Member({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    callSign: req.body.callSign,
    licenseClass: req.body.licenseClass,
    membershipType: req.body.membershipType,
    title: req.body.title,
    arrlMember: req.body.arrlMember,
    interests: req.body.interests,
    memberNotes: req.body.memberNotes,
  });

  Member.updateOne({ _id: req.params.id }, member).then((result) => {
    res.status(200).json({ message: "Member updated." });
  });
});

module.exports = router;
