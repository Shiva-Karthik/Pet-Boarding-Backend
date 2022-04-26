module.exports = function (permittedRoles) {
  return function (req, res, next) {
    const user = req.user;
    let isPermitted = false;
    permittedRoles.map((role) => {
      if (user.role.includes(role)) {
        isPermitted = true;
      }
    });
    if (!isPermitted) {
      res.status(403).send({ message: "Permission Denied" });
    }
    return next();
  };
};

