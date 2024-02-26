export class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }

    userSignUp = async (req, res, next) => {
        try {
            const { email, name, password, confirmPassword, addr, number, role } = req.body;
            const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
            const numberPattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
            if (!email || !name || !password || !confirmPassword || !addr || !number || !role)
            return res.status(400).json({message : '필수 값을 입력하지 않았습니다.'})
            if (password !== confirmPassword) return res.status(400).json({message : '비밀번호와 비밀번호 확인이 일치하지 않습니다.'})
            if (!['user', 'owner'].includes(role)) return res.status(400).json({message :'올바르지 않은 권한입니다.'})
            if (emailPattern.test(email)==false) return res.status(400).json({message :'이메일 형식이 올바르지 않습니다.'})
            if (numberPattern.test(number)==false) return res.status(400).json({message :'전화번호 형식이 올바르지 않습니다.'})
            const createdUser = await this.usersService.createUser(email, name, password, confirmPassword, addr, number, role);
            return res.status(201).json({ data: createdUser });
        } catch (err) {
            next(err);
        }
    }

    userSignIn = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const loginUser = await this.usersService.loginUser(email, password)
            return res.status(201).json({data:loginUser})
        } catch (err) {
            next(err);
        }
    }
}
