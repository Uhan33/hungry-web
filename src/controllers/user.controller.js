export class UsersController{
    constructor(usersService){
this.usersService = usersService
    }
    userSignUp = async (res, req, next) => {
        try{
            const {email, name, password, confirmPassword, addr, number, role} = req.body
            const createdUser = this.usersService.createUser(email, name, password, confirmPassword, addr, number, role)
            return res.status(201).json({ data: createdUser });
        }catch(err){
            next(err)
        }
    }
    userSignIn = async (res, req, next) => {
        try{
            const {email, password} = req.body

        }catch(err){
            next(err)
        }
    }
}