import User from "../schema/user.js";

async function handleUserSignUp(req, res) {
  // The controller code will go here
  const { name, email, password } = req.body;
  await User.create({ 
    name, 
    email, 
    password });

  return res.render("home");
};

export default handleUserSignUp;