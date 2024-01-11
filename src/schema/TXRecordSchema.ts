import * as z from 'zod'


export const TXRecordSchema = z.object({
    feeder: z.string(),
    location: z.string(),
    date: z.date(),
    substation_number: z.string(),
    capacity: z.string(),
    year: z.string(),
    serial_number: z.string(),
    manufacturer: z.string(),
    remarks: z.string(),
})

export type TXRecordSchemaType = z.infer<typeof TXRecordSchema>