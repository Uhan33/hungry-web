export class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    userSignUp = async (req, res, next) => {
        try {
            const { email, name, password, confirmPassword, addr, number, role } = req.body;
            if (!email || !name || !password || !confirmPassword || !addr || !number || !role) throw new Error('필수 값을 입력하지 않았습니다.')
            if (password !== confirmPassword) throw new Error ('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
            const createdUser = await this.usersService.createUser(email, name, password, confirmPassword, addr, number, role);
            return res.status(201).json({ data: createdUser });
        } catch (err) {
            next(err);
        }
    }

    userSignIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
        } catch (err) {
            next(err);
        }
    }
}
