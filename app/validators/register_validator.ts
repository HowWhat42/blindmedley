import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    userName: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().email().trim().normalizeEmail(),
    password: vine
      .string()
      .minLength(8)
      .trim()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .confirmed({
        confirmationField: 'confirmPassword',
      }),
  })
)
