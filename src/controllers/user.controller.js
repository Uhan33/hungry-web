import { sendMail, generateValidationCode } from '../middlewares/mail.middleware.js';
export class UsersController {
  constructor(usersService, pointRepository, usersRepository) {
    this.usersService = usersService;
    this.pointRepository = pointRepository;
    this.usersRepository = usersRepository;
  }

  userSignUp = async (req, res, next) => {
    try {
      const { email, name, password, confirmPassword, addr, number, role } = req.body;
      const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
      const numberPattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
      if (!email || !name || !password || !confirmPassword || !addr || !number || !role)
        return res.status(400).json({ message: '필수 값을 입력하지 않았습니다.' });
      if (password !== confirmPassword)
        return res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
      if (!['user', 'owner'].includes(role)) return res.status(400).json({ message: '올바르지 않은 권한입니다.' });
      if (emailPattern.test(email) == false)
        return res.status(400).json({ message: '이메일 형식이 올바르지 않습니다.' });
      if (numberPattern.test(number) == false)
        return res.status(400).json({ message: '전화번호 형식이 올바르지 않습니다.' });
      const createdUser = await this.usersService.createUser(
        email,
        name,
        password,
        confirmPassword,
        addr,
        number,
        role
      );
      return res.status(201).json({ data: createdUser });
    } catch (err) {
      next(err);
    }
  };

  userSignIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const loginUser = await this.usersService.loginUser(email, password);
      res.cookie('accessToken', `Bearer ${loginUser.accessToken}`);
      res.cookie('refreshToKen', `Bearer ${loginUser.refreshToKen}`);
      return res.status(201).json({ data: loginUser });
    } catch (err) {
      next(err);
    }
  };

  emailAuth = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await this.usersRepository.findByUserEmail(email);
      const userId = await this.pointRepository.findUserById(user.userId);
      if (userId) return res.status(400).json({ message: '이미 포인트를 지급하였습니다.' });
      if (user.role !== 'user') return res.status(400).json({ message: '사용자만 포인트 적립을 받을 수 있습니다.' });
      const validationCode = generateValidationCode(6);
      await sendMail(email, validationCode);
      const token = await this.usersService.generateToken(email);
      if (token) {
        await this.pointRepository.signUpPoint(user.userId);
        res.json({ token });
      }
    } catch (err) {
      next(err);
    }
  };
}
