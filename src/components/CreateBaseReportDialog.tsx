'use client'

import { createBaseReportSchema, createBaseReportSchemaType } from "@/schema/createReportSchemaType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader, LoaderIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import axios from "axios";
import { toast } from "./ui/use-toast";


interface CreateBaseReportDialogProps {
    open: boolean
    setOpen: (open: boolean)=>void
}
 
const CreateBaseReportDialog: FunctionComponent<CreateBaseReportDialogProps> = ({open, setOpen}) => {

    const router = useRouter()

    const form = useForm<createBaseReportSchemaType>({
        resolver: zodResolver(createBaseReportSchema),
        defaultValues: {
            name: '',
        }
    })

    const openChangeWrapper = (value: boolean) =>{
        setOpen(value);
    }

    const onSubmit = async (data: createBaseReportSchemaType) =>{
        try {

            console.log(data.date.toISOString())

            await axios.post(
                'http://127.0.0.1:8000/api/reports/base-report-create/',{
                    name: data.name,
                    date: data.date.toISOString().slice(0, 10)
                },)


            router.refresh()

            openChangeWrapper(false)

            form.reset()

            toast({
                title: 'Success',
                description: 'Report was created successfully'
            })
        } catch (e){
            console.log(e)
            toast({
                title: 'Error',
                description: 'Opps Something went wrong, please try again.',
                variant: 'destructive'
            })
        }
    }

    return ( 
        <Dialog open={open} onOpenChange={openChangeWrapper}>
            <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
                <DialogTitle>
                    Create New Report
                </DialogTitle>
                <DialogDescription>
                    By default your report will contain the following sections:HV Section, Planned Outages, Forced Outages, Load Shedding and Defects
                </DialogDescription>
                <div className="gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Report Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg SES Report" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="date"
                            render={
                                ({field})=>(
                                    <FormItem className="pt-2">
                                        <FormLabel>Date</FormLabel>
                                        <FormDescription>Report Date</FormDescription>
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
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button 
                    disabled={form.formState.isSubmitting}
                    onClick={form.handleSubmit(onSubmit)}
                    className={cn('w-full')}
                    variant={'default'}
                    >Confirm {form.formState.isSubmitting && (<LoaderIcon className="h-6 w-6 animate-spin"/>)}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
 
export default CreateBaseReportDialog;