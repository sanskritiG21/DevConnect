const adminAuth = (req, res, next) => {
  console.log("admin auth is getting checked");
  let authToken = "admin";
  let authorised = authToken === "admin";
  if (!authorised) {
    res.status(401).send("This admin is not authorised");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("user auth is getting checked");
  let authToken = "user";
  let authorised = authToken === "user";
  if (!authorised) {
    res.status(401).send("This user is not authorised");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
