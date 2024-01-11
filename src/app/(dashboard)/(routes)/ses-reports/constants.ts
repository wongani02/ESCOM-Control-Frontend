import * as z from 'zod';


export const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Prompt is required'
    }),
    date: z.date()
})