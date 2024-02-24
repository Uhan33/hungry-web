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
    loginUser = async(email, password)=>{
        const user = await this.prisma.users.findFirst({
            where: { email },
            select : {email: true, password: true}
        })
        return user
    }
    findByUserEmail = async(email,password)=>{
        const emailUser = await this.prisma.users.findFirst({
            where:{email}
        })
        return emailUser
    }
}