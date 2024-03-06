import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.clearCookie("session");
  res.send({});
});

export { router as signoutRouter };
