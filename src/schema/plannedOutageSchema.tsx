import * as z from 'zod';


export const PlannedOutageSchema = z.object({
    report: z.number().nonnegative(),
    feeder: z.string(),
    load: z.string().optional(),
    affected_areas: z.string(),
    number_of_tx: z.string().optional(),
    installed_capacity: z.string().optional(),
    outage_description: z.string().min(5, {message: 'atleast 5 characters are required'}),
    planned_date_time_out: z.string(),
    planned_date_time_restored: z.string(),
    actual_date_time_out: z.string().optional(),
    actual_date_time_restored: z.string().optional(),
    cause: z.string().min(5, {message: 'atleast 5 characters are required'}),
    remarks: z.string().min(5, {message: 'at least 5 charaters are required'}).optional()
})

export type PlannedOutageSchemaType = z.infer<typeof PlannedOutageSchema>