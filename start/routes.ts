import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
    return { hello: 'world' }
})

Route.group(() => {
    Route.post('/', 'UsersController.create')
    Route.post('/auth', 'UsersController.auth')
}).prefix('user')

Route.group(() => {
    Route.post('/', 'TeamsController.create')
    Route.get('/', 'TeamsController.index')
}).prefix('team').middleware('auth')
