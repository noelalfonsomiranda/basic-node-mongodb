const bcrypt = require("bcryptjs");
const User = require("../model/User");

//@desc get all users
//@route GET /api/v1/auth
//@access public
exports.getUsers = async (req, res) => {
  //get all users
  const users = await User.find();

  if (!users) {
    return res.json({ status: "error", error: "No users found" });
  }
  res.json({ status: 200, users: users });
};

//@desc register a user
//@route POST /api/v1/auth
//@access public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      throw new Error("User exists already.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.json({
      status: 200,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    logger.error(err);
    res.json({ status: 500, error: "Invalid email" });
  }
};

//@desc login user
//@route GET /api/v1/auth/login
//@access public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return { status: 404, error: "User does not exists!" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return res.json({ status: 200, user: user });
    } else {
      return res.json({ status: 404, user: false });
    }
  } catch (err) {
    logger.error(err);
    res.json({ status: 500, error: "Invalid login" });
  }
};

//@desc update user
//@route PUT /api/v1/auth/:id
//@access public
exports.updateUser = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.params.id;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        email: email,
        password: hashedPassword,
      },
    });
    if (!user) {
      return res.json({ status: 404, error: "Invalid user" });
    }
    res.json({ status: 200, user: user });
  } catch (err) {
    logger.error(err);
    res.json({ status: 500, error: "Invalid user" });
  }
};

//@desc delete user
//@route DELETE /api/v1/auth/:id
//@access public
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.json({ status: 404, error: "Invalid user" });
    }
    res.json({ status: 200, user: user });
  } catch (err) {
    logger.error(err);
    res.json({ status: 500, error: "Invalid user" });
  }
};