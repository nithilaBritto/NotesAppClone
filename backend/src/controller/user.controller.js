import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });
    res.status(201).json({
      message: "user Successfully created",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    res.status(201).json({
      message: "Logged in",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(201).json({ message: "user logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export { registerUser, loginUser, logoutUser };
