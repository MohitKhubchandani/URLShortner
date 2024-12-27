import User from "../schema/user.js";
import { setUser } from "../service/auth.js";

async function handleUserSignUp(req, res) {
  // The controller code will go here
  const { name, email, password } = req.body;
  await User.create({ 
    name, 
    email, 
    password });

  return res.redirect("/url");
};

export async function handleUserSignIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if(!user) {
    return res.render("signin", { error: "Invalid credentials" });
  };

  const token = setUser(user);
  res.cookie("uid", token);

  return res.redirect("/url");
};

export default handleUserSignUp ;