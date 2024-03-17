/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const PlaylistController = () => import('#controllers/playlist_controller')

router
  .group(() => {
    router.post('/logout', [AuthController, 'logout'])
    router.get('/', ({ inertia }) => inertia.render('home', { version: '6' }))
    router.get('/me', [AuthController, 'me'])

    router.get('/playlists', [PlaylistController, 'index'])
    router.get('/playlists/:id', [PlaylistController, 'show'])
    router.get('/profile', ({ inertia }) => inertia.render('profile'))
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/auth', ({ inertia }) => inertia.render('auth'))
  })
  .use(middleware.guest())

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

