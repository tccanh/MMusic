const [USER, ADMIN, MOD] = ["USER", "ADMIN", "MOD"];
const errors = {};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  errors.login = "You need login before";
  return res.json(errors);
};

const isADMIN = (req, res, next) => {
  const ROLE = req.user.role;
  if (req.isAuthenticated()) {
    if (ROLE === ADMIN) {
      return next();
    }
    errors.ROLE = "You don't have permission to access";
    return res.json(errors);
  }
  errors.login = "You need login before";
  return res.json(errors);
};

const isMOD = (req, res, next) => {
  const { ROLE } = req.user;
  if (req.isAuthenticated()) {
    if (ROLE === ADMIN || ROLE === MOD) {
      return next();
    }
    errors.ROLE = "You don't have permission to access";
    return res.json(errors);
  }
  errors.login = "You need login before";
  return res.json(errors);
};

const isUSER = (req, res, next) => {
  const { ROLE } = req.user;
  if (req.isAuthenticated()) {
    if (ROLE === ADMIN || ROLE === MOD || ROLE === USER) {
      return next();
    }
    errors.ROLE = "You don't have permission to access";
    return res.json(errors);
  }
  errors.login = "You need login before";
  return res.json(errors);
};
module.exports = {
  isAuthenticated,
  isADMIN,
  isMOD,
  isUSER
};
