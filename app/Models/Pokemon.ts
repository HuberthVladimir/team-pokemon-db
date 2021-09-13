import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pokemon extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public team_id: number

    @column()
    public name: string

    @column()
    public image: string

    @column()
    public type: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
