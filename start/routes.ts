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
const UserController = () => import('#controllers/user_controller')
const PlaylistController = () => import('#controllers/playlist_controller')
const TrackController = () => import('#controllers/track_controller')
const TokensController = () => import('#controllers/tokens_controller')
const GameController = () => import('#controllers/game_controller')

router
  .group(() => {
    router.post('/logout', [AuthController, 'logout'])
    router.get('/', ({ inertia }) => inertia.render('home', { version: '6' }))
    router.get('/me', [AuthController, 'me'])

    router.get('/playlists', [PlaylistController, 'index']).as('playlists.index')
    router.get('/playlists/:id', [PlaylistController, 'show']).as('playlists.show')
    router.post('/playlists', [PlaylistController, 'store'])
    router.post('/playlists/:id/import', [PlaylistController, 'import'])
    router.put('/playlists/:id/add-track', [PlaylistController, 'addTrack'])
    router.put('/playlists/:id', [PlaylistController, 'update'])
    router.delete('/playlists/:id/remove-track', [PlaylistController, 'removeTrack'])
    router.delete('/playlists/:id', [PlaylistController, 'destroy'])

    router.get('/tracks/search', [TrackController, 'search'])

    router.get('/tokens/spotify', [TokensController, 'spotify'])

    router.get('/profile', ({ inertia }) => inertia.render('profile'))
    router.put('/profile/volume', [UserController, 'updateVolume'])

    router.get('/games/:playlistId/play', [GameController, 'newGame'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/auth', ({ inertia }) => inertia.render('auth'))
  })
  .use(middleware.guest())

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])
