import {z} from 'zod'

export const createBaseReportSchema = z.object({
    name: z.string().min(4, {message: 'Atleast 4 characters are required'}),
    date: z.date(),
})

export type createBaseReportSchemaType = z.infer<typeof createBaseReportSchema>