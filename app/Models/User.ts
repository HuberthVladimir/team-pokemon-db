import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
    column,
    beforeSave,
    BaseModel,
    hasMany, HasMany
} from '@ioc:Adonis/Lucid/Orm'

import Team from 'App/Models/Team'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public email: string

    @column()
    public name: string

    @column({ serializeAs: null })
    public password: string

    @hasMany(() => Team, { localKey: 'id', foreignKey: 'user_id' })
    public teams: HasMany<typeof Team>


    @column()
    public rememberMeToken?: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }
}
