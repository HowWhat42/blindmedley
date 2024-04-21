import vine from '@vinejs/vine'

export const updateVolumeValidator = vine.compile(
  vine.object({
    volume: vine.number(),
  })
)
