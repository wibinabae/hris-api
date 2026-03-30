const bcrypt = require("bcrypt");
const AuthRepository = require("../repositories/authRepository");
const { generateToken } = require("../utils/jwt");

const AuthService = {
  register: async ({
    username,
    email,
    password,
    role = "employee",
    employee_id,
  }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AuthRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role,
      employee_id,
    });

    const token = generateToken({
      id: user.id,
      role: user.role,
      employee_id: user.employee_id,
    });

    return { user, token };
  },

  login: async (login, password) => {
    const user = await AuthRepository.findByLogin(login);
    if (!user) throw new Error("User not found");
    if (!user.is_active) throw new Error("User is active");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");
    const token = generateToken({
      id: user.id,
      role: user.role,
      employee_id: user.employee_id,
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    };
  },
};

module.exports = AuthService;
