import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TeamCreateValidator {
    constructor(protected ctx: HttpContextContract) {
    }

    public schema = schema.create({
        name: schema.string({}, [
            rules.minLength(1),
            rules.maxLength(255)
        ]),
    })


    public messages = {}
}
