export class UsersRepository{
    constructor(prisma){
        this.prisma = prisma
    }
    createUser = async (email, name, password, confirmPassword, addr, number, role) => {
        const createdUser = await this.prisma.users.create({
            data: {
                email,
                name,
                password,
                addr,
                number,
                role,
                point: {
                    create: {
                        money: 1000000
                    }
                }
            },
            include: {
                point: true
            }
        });
    
        return createdUser;
    }
    loginUser = async(email)=>{
        const user = await this.prisma.users.findFirst({
            where: {email}
        })
        return user
    }
    findByUserEmail = async(email)=>{
        const emailUser = await this.prisma.users.findFirst({
            where:{
                email
            }
        })
        return emailUser
    }
}