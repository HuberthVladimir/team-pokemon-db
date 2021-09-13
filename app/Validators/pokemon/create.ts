import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default schema.create({
    name: schema.string({}, [
        rules.minLength(3),
        rules.maxLength(255)
    ]),
    image: schema.string({}, [
        rules.minLength(3),
        rules.maxLength(255)
    ]),
    type: schema.string({}, [
        rules.minLength(3),
        rules.maxLength(255)
    ])
})

