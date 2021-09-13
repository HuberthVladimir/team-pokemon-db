import { DateTime } from 'luxon'
import {
    column,
    BaseModel,
    hasMany, HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Pokemon from 'App/Models/Pokemon'

export default class Team extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public user_id: number

    @hasMany(() => Pokemon, { localKey: 'id', foreignKey: 'team_id' })
    public pokemons: HasMany<typeof Pokemon>


    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
