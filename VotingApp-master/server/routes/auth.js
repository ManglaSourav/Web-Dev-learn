const router = require("express").Router();

const handler = require("../handlers");

router.post("/register", handler.register);
router.post("/login", handler.login);

module.exports = router;
