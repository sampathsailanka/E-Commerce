const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    // const payload = isTokenValid({ token });
    // console.log(payload);
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
  next();
};

// const authorizePermissions = (req, res, next) => {
//   //   console.log("admin route");
//   if (req.user.role !== "admin") {
//     throw new CustomError.UnauthorizedError(
//       "Unauthorized to access this route"
//     );
//   }
//   next();
// };

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
