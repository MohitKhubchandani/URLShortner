import { getUser } from "../service/auth.js";

async function restrictToLoggedInUsersOnly(req, res, next) {
  try {
    const userUid = req.cookies?.uid;

    // If no UID in cookies, redirect to signin
    if (!userUid) return res.redirect("/user/signin");

    // Fetch the user (await is required for async function)
    const user = getUser(userUid);

    // If user does not exist, redirect to signin
    if (!user) return res.redirect("/user/signin");

    // Attach the user object to req for downstream usage
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle errors (e.g., log the error and redirect to an error page)
    console.error("Error in restrictToLoggedInUsersOnly middleware:", error);
    res.status(500).send("An error occurred. Please try again later.");
  }
};

export default restrictToLoggedInUsersOnly;
