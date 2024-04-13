import vine from '@vinejs/vine'

export const playlistValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    isPublic: vine.boolean(),
  })
)
