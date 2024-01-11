'use client' 

import { FunctionComponent } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { DefectSchema, DefectSchemaType } from "@/schema/defectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, wait } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface DefectsCreateSheetProps {
    open: boolean
    setOpen: (open:boolean)=>void
    report_id: number
}
 
const DefectsCreateSheet: FunctionComponent<DefectsCreateSheetProps> = ({open, setOpen, report_id}) => {


    const openChangeWrapper = (value: boolean) =>{
        setOpen(value)
    }

    const form = useForm<DefectSchemaType>({
        resolver: zodResolver(DefectSchema),
        defaultValues: {
            report: report_id,
        }
    })

    const router = useRouter()

    const onSubmit = async (data: DefectSchemaType) =>{

        try {

            await axios.post('https://escom-control-backend-production.up.railway.app/api/reports/defect-list-create/', {
                report: data.report,
                date_reported: data.date_reported.toISOString().slice(0, 10),
                description :data.description,
                action_taken : data.action_taken,
                days_outstanding: data.days_outstanding,
                remarks: data.remarks,
                responsible_office: data.responsible_office
            })

            router.refresh()

            openChangeWrapper(false)

            form.reset()

            toast({
                title: 'Success',
                description: 'Defect has been recorded'
            })


        }catch (e) {
            console.log(e)
            toast({
                title: 'Error',
                description: 'Oops an error occurred',
                variant: 'destructive',
            })
        }

    }

    return ( 
        <Sheet open={open} onOpenChange={openChangeWrapper}>
            <SheetContent className="md:min-w-[400px] overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>Record Defect</SheetTitle>
                    <SheetDescription>
                        All Defect fields should be field
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <Form {...form}>
                        <form className="gap-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                            control={form.control}
                            name="date_reported"
                            render={
                                ({field})=>(
                                    <FormItem className="pt-2">
                                        <FormLabel>Date Reported</FormLabel>
                                        
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full h-13 pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Select a Date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar mode='single' selected={field.value} onSelect={field.onChange} initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormDescription>Date on which defect was recorded</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }
                            />
                            <FormField
                            control={form.control}
                            name='description'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    
                                    <FormControl>
                                        <Input placeholder="" {...field}/>
                                    </FormControl>
                                    <FormDescription>Brief description of the defect</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name='responsible_office'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Responsible Office</FormLabel>
                                    <FormDescription>Office that handles the defect</FormDescription>
                                    <FormControl>
                                        <Input placeholder="" {...field}/>
                                    </FormControl>
                                    <FormDescription>Office that handles the defect</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name='action_taken'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Action Taken</FormLabel>
                                    
                                    <FormControl>
                                        <Input placeholder="" {...field}/>
                                    </FormControl>
                                    <FormDescription>Any action taken (if no action put none)</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name='days_outstanding'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Days Outstanding</FormLabel>
                                    
                                    <FormControl>
                                        <Input placeholder="" {...field}/>
                                    </FormControl>
                                    <FormDescription>Number of days outstanding</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name='remarks'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Remarks</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field}/>
                                    </FormControl>
                                    <FormDescription>Any relevant information</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        </form>
                    </Form>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                        variant={'secondary'}
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                        >
                            Save Defect
                            {form.formState.isSubmitting && (
                                <Loader2 className="w-4 h-4 m-2 animate-spin"/>
                            )}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
 
export default DefectsCreateSheet;

function async() {
    throw new Error("Function not implemented.");
}
