const express = require("express");
const checkAuth = require("../middleware/check-auth");
const MemberController = require("../controllers/member");

const router = express.Router();

router.delete("/:id", checkAuth, MemberController.deleteMember);
router.get("", MemberController.getMembers);
router.get("/:id", MemberController.getMember);
router.post("", checkAuth, MemberController.createMember);
router.put("/:id", checkAuth, MemberController.updateMember);

module.exports = router;
