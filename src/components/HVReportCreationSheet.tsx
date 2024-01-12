'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HVReportFormSchema, HVReportFormSchemaType } from "@/schema/HVReportFormSchema";
import { toast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { cn, wait } from "@/lib/utils";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { useRouter } from "next/navigation";



interface HvReportCreationSheetProps {
    open: boolean
    onOpenChange: (open:boolean)=>void
    report: BaseReportList
}


const HvReportCreationSheet: FunctionComponent<HvReportCreationSheetProps> = ({open, onOpenChange, report}) => {


    const [feeders, setFeeders] = useState<Feeder[]>([]);

    useEffect(()=>{
        const fetchFeeders = async () =>{
            const feederList = await axios.get('https://escom-control-backend-production.up.railway.app/api/ses-control/feeders/')
            // console.log(feederList)
            const data:Feeder[] = await feederList.data

            setFeeders(data)
        }
        
        fetchFeeders()

    }, [])


    const form = useForm<HVReportFormSchemaType>({
        resolver: zodResolver(HVReportFormSchema),
        defaultValues: {
            report: report.pk
        }
    })

    const openChangeWrapper = (open: boolean) =>{
        // form.reset()
        onOpenChange(open)
    }

    const router = useRouter()

    const onSubmit = async (data: HVReportFormSchemaType) =>{

        try{

            await axios.post('https://escom-control-backend-production.up.railway.app/api/reports/hv-report-create/', {
                 report: data.report,
                feeder: Number(data.feeder),
                load: Number(data.load),
                outage_description: data.outage_description,
                date_time_out:data.date_time_out,
                date_time_restored: data.date_time_restored,
                cause: data.cause,
                remarks: data.remarks,
            })

            router.refresh()

            openChangeWrapper(false)

            toast({
                title: 'Success',
                description: 'HV record created successfully'
            })

        } catch (e){
            toast({
                title: 'Error',
                description: 'Failed to create HV record',
                variant: 'destructive'
            })
        }
    }

    return ( 
        <Sheet open={open} onOpenChange={openChangeWrapper}> 
            <SheetContent className="md:min-w-[550px] overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>
                        Add a High Voltage Record
                    </SheetTitle>
                    <SheetDescription>
                        All HV records will be added using this form. All fields are required.
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <Form {...form}>
                        <form className="gap-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-12 gap-4">
                                <FormField
                                control={form.control}
                                name="feeder"
                                render={({ field }) => (
                                    <FormItem className="mt-2 col-span-6 ">
                                        <FormLabel>Feeder</FormLabel>
                                        
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a feeder" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {feeders.map((feeder)=>(
                                                    <SelectItem key={feeder.pk} value={`${feeder.pk}`}>{feeder.feeder}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select a feeder
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                name="load"
                                render={({field})=>(
                                    <FormItem className="col-span-6 mt-2">
                                        <FormLabel>Load (Amps)</FormLabel>
                                        
                                        <FormControl>
                                            <Input type="number" min={1} placeholder="240" {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                            Load at which feeder opened
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            
                            {/* <FormField
                            name="language"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Feeder</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value
                                                    ? feeders.find(
                                                        (feeder) => feeder.feeder === field.value
                                                    )?.feeder
                                                    : "Select Feeder"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Search Feeder..." />
                                                <CommandEmpty>No Feeder found.</CommandEmpty>
                                                <CommandGroup>
                                                {feeders.map((feeder) => (
                                                    <CommandItem
                                                    value={`${feeder.pk}`}
                                                    key={feeder.pk}
                                                    onSelect={() => {
                                                        form.setValue("feeder", `${feeder.pk}`)
                                                    }}
                                                    >
                                                    <Check
                                                        className={cn(
                                                        "mr-2 h-4 w-4",
                                                        `${feeder.pk}` === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                        )}
                                                    />
                                                    {feeder.feeder}
                                                    </CommandItem>
                                                ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        This is the language that will be used in the dashboard.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            /> */}
                            <FormField
                            control={form.control}
                            name="outage_description"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Outage Description</FormLabel>
                                    
                                    <FormControl>
                                        <Input placeholder="eg VCB 105 tripped" {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        Description of trip
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <div className="grid grid-cols-12 gap-4">
                                <FormField
                                control={form.control}
                                name="date_time_out"
                                render={
                                    ({field})=>(
                                        <FormItem className="pt-2 col-span-6">
                                            <FormLabel>Date & Time out</FormLabel>
                                            
                                            <FormControl>
                                                <Input type="datetime-local" {...field}/>
                                            </FormControl>
                                            <FormDescription>Datetime at which power went out</FormDescription>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }
                                />
                                <FormField
                                control={form.control}
                                name='date_time_restored'
                                render={({field})=>(
                                    <FormItem className="pt-2 col-span-6">
                                        <FormLabel>Date & Time Restored</FormLabel>
                                        
                                        <FormControl>
                                            <Input type="datetime-local" placeholder="" {...field}/>
                                        </FormControl>
                                        <FormDescription>Restoration datetime</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                            control={form.control}
                            name="cause"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Cause of Outage</FormLabel>
                                    
                                    <FormControl>
                                        <Input placeholder="eg Transient" {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        what caused the outage
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="remarks"
                            render={({field})=>(
                                <FormItem className="">
                                    <FormLabel>Remarks</FormLabel>
                                    
                                    <FormControl>
                                        <Input placeholder="eg stayed in after closing" {...field}/>
                                    </FormControl>
                                    <FormDescription>
                                        What action was taken
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        </form>
                    </Form>
                    <div className="flex flex-col gap-3 mt-4">
                    {/* <Separator/> */}
                    <Button 
                    disabled={form.formState.isSubmitting}
                    className={''} onClick={form.handleSubmit(onSubmit)} variant={'secondary'}>
                        Save Record 
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
 
export default HvReportCreationSheet;