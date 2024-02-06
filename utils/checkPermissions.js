const CustomError = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(requestUser);
  //   console.log(resourceUserId); // new ObjectId
  //   console.log(typeof resourceUserId); // Object

  if (requestUser.role === "admin") return;

  if (requestUser.userId === resourceUserId.toString()) return;

  throw new CustomError.UnauthorizedError(
    "not authorized to access this route"
  );
};

module.exports = {
  checkPermissions,
};
