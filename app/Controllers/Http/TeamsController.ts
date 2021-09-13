import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pokemon from 'App/Models/Pokemon'
import Team from 'App/Models/Team'
import { createTeam } from 'App/Validators'

export default class TeamsController {
    public async index({ auth, response }: HttpContextContract) {
        const user = await auth.authenticate()

        try {
            const teams = await Team.query().where('user_id', user.id).preload('pokemons')
            return response.status(200).json(teams)
        } catch {
            return response.status(400).json({ message: "Não foi possivel buscar os seus times" })
        }
    }

    public async create({ request, response, auth }: HttpContextContract) {
        const user = await auth.authenticate()
        const data = await request.validate(createTeam)
        const { pokemons } = request.all()

        try {
            const team = await Team.create({ ...data, user_id: user.id })

            const pokemonsFormated = pokemons.map((item) => {
                // const pokemon = await validator.validate({ schema: createPokemon, data: item })
                console.log({ ...item, team_id: team.id })
                return { ...item, team_id: team.id }
            })

            await Pokemon.createMany(pokemonsFormated)
            return response.status(200).json({ message: "Time Criado com sucesso" })
        }
        catch (err) {
            console.log(err)
            return response.status(400).json({ message: "Não foi possivel criar o seu time" })
        }


    }
}
