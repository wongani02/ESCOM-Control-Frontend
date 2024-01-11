import * as z from 'zod'

export const MimicRecordSchema = z.object({
    feeder: z.string(),
    mimicNumber: z.string(),
    description: z.string().min(5, {message: 'Atleast 5 characters are required'}),
    date: z.date(),
    size: z.number(),
    location: z.string()
})


export type MimicNumberSchemaType = z.infer<typeof MimicRecordSchema>