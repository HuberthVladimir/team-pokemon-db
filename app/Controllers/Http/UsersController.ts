import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { createUser, authUser } from 'App/Validators'

export default class UsersController {
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(createUser)
        try {
            const user = await User.create(data)
            return response.status(200).json(user)
        } catch (err) {
            console.log(err)
            return response.status(400).json({ message: 'Não foi possivel criar usuario' })
        }
    }

    public async auth({ request, response, auth }: HttpContextContract) {
        const { email, password } = await request.validate(authUser)
        try {
            const userAuth = await auth.attempt(email, password)
            const user = await User.query().where('email', email).preload('teams', teams => teams.preload('pokemons'))
            return response.status(200).json({ token: userAuth, user })
        } catch {
            return response.status(400).json({ message: 'Verifique se seus dados estão corretos' })
        }
    }
}
