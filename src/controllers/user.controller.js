export class UsersController{
    constructor(usersService){
this.usersService = usersService
    }
    userSignUp = async (res, req, next) => {
        try{
            const {email, password, name, role} = req.body
            const createdUser = this.usersService.createUser(email, password, name, role)
            return res.status(201).json({ data: createdUser });
        }catch(err){
            next(err)
        }
    }
    userSignIp = async (res, req, next) => {
        try{
            const {email, password} = req.body

        }catch(err){
            next(err)
        }
    }
}