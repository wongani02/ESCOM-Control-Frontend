import * as z from  'zod'


export const DefectSchema = z.object({
    report: z.number().nonnegative(),
    date_reported: z.date(),
    description: z.string(),
    responsible_office: z.string(),
    action_taken: z.string(),
    days_outstanding: z.string(),
    remarks: z.string(),
})


export type DefectSchemaType = z.infer<typeof DefectSchema>
