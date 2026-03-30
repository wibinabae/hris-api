const AuthService = require('../services/authService');

const successResponse = (res, message, data) => {
  return res.status(200).json({ success: true, message, data });
};

const errorResponse = (res, message, code = 400) => {
  return res.status(code).json({ success: false, message });
};

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, email, password, role, employee_id } = req.body;
      const data = await AuthService.register({ username, email, password, role, employee_id });
      return successResponse(res, 'Register successful', data);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;
      const data = await AuthService.login(login, password);
      return successResponse(res, 'Login successful', data);
    } catch (err) {
      return errorResponse(res, err.message, 401);
    }
  }
};

module.exports = AuthController;