export const isSuperAdmin = (req, res, next) => {
 if(req.query.admin === 'true') {
   console.log("Super admin");
   next();
  } else {
    res.send("You are not super admin");
  }
}