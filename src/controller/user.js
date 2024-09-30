export const getUser = (req, res) => {
  req.log.info("User info controller");
  res.send("User");
};

export const getAllUsers = (req, res) => {
  req.log.info("All users controller");
  res.send("All users");
}