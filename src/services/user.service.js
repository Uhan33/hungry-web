import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export class UsersService{
    constructor(usersReposity){
        this.usersReposity = usersReposity
    }
    createUser = async(email, name, password, addr, number, role)=>{
        const user = await this.usersReposity.findByUserEmail(email)
        if (user) throw new Error ('이미 존재하는 email입니다.')
        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await this.usersReposity.createUser(email, name, hashedPassword, addr, number, role)
        return {
            email : createdUser.email,
            name : createdUser.name,
            addr : createdUser.addr,
            number : createdUser.number,
            role : createdUser.role,
            point :createdUser.point
        }
    }
    loginUser = async(email, password)=>{
        const loggedInUser = await this.usersReposity.loginUser(email, password)
        // 보안을 위해 이메일, 비밀번호 같이 유효성 검사
        if (loggedInUser.email !== email||!(await bcrypt.compare(password, loggedInUser.password))) throw new Error ('이메일이나 비밀번호가 올바르지 않습니다.')

        const accessToken = jwt.sign({userId: loggedInUser.userId}, process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:'12h'})
        const refreshToKen = jwt.sign({userId: loggedInUser.userId}, process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:'7d'})
        return {
            email: loggedInUser.email,
            porint: loggedInUser.porint,
            accessToken : accessToken,
            refreshToKen : refreshToKen
        }
    }
}