import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().email().trim().normalizeEmail(),
    password: vine.string().trim(),
  })
)
