import * as z from 'zod'


export const ForcedOutageSchema = z.object({
    report: z.number().nonnegative(),
    feeder: z.string(),
    load: z.string(),
    affected_areas: z.string(),
    number_of_tx: z.string(),
    installed_capacity: z.string(),
    outage_description: z.string().min(5, {message: 'atleast 5 characters are required'}),
    date_time_out: z.string(),
    date_time_restored: z.string(),
    cause: z.string().min(5, {message: 'atleast 5 characters are required'}),
    remarks: z.string().min(5, {message: 'at least 5 charaters are required'})
})


export type ForcedOutageSchemaType = z.infer<typeof ForcedOutageSchema>