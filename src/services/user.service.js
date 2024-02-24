export class UsersService{
    constructor(usersReposity){
        this.usersReposity = usersReposity
    }
    createUser = async(email, name, password, confirmPassword, addr, number, role)=>{
        const user = await this.usersReposity.findByUserEmail(email)
        if (user) throw new Error ('이미 존재하는 email입니다.')
        const createdUser = await this.usersReposity.createUser(email, name, password, confirmPassword, addr, number, role)
        return {
            email : createdUser.email,
            name : createdUser.name,
            addr : createdUser.addr,
            number : createdUser.number,
            role : createdUser.role,
        }
    }
    loginUser = async()=>{}
}