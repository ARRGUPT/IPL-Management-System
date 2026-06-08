import ApiError from "../../../common/utils/api-error.js";

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw ApiError.forbidden("Admin access required");
  }
  next();
};
