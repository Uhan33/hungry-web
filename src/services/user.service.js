export class UsersService{
    constructor(usersReposity){
        this.usersReposity = usersReposity
    }
    createUser = async(email, name, password, confirmPassword, addr, number, role)=>{
        const user =await this.usersReposity.find
    }
    loginUser = async()=>{}
}