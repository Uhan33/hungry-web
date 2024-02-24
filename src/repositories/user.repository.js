export class UsersRepository{
    constructor(prisma){
        this.prisma = prisma
    }
    createUser = async(email, name, password, confirmPassword, addr, number, role)=>{
        const createdUser = await this.prisma.users.create({email, name, password, addr, number, role})
        return createdUser
    }
    loginUser = async()=>{}
    findByUserEmail = async(email)=>{
        const emailUser = await this.prisma
    }

}