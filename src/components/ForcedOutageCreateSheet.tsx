'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { ForcedOutageSchema, ForcedOutageSchemaType } from "@/schema/forcedOutageschema";
import { zodResolver } from "@hookform/resolvers/zod";
import { wait } from "@/lib/utils";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

interface ForcedOutageCreateSheetProps {
    open: boolean
    setOpen: (open: boolean)=>void
    report_id: number
}
 
const ForcedOutageCreateSheet: FunctionComponent<ForcedOutageCreateSheetProps> = ({open, setOpen, report_id}) => {

    const [feeders, setFeeders] = useState<Feeder[]>([]);

    useEffect(()=>{
        const fetchFeeders = async () =>{
            const feederList = await axios.get('http://127.0.0.1:8000/api/ses-control/feeders/')
            // console.log(feederList)
            const data:Feeder[] = await feederList.data

            setFeeders(data)
        }
        
        fetchFeeders()

    }, [])

    const openChangeWrapper = (value: boolean) =>{
        setOpen(value)
    }

    const form = useForm<ForcedOutageSchemaType>({
        resolver: zodResolver(ForcedOutageSchema),
        defaultValues: {
            report: report_id
        }
    })

    const router = useRouter();

    const onSubmit = async (data: ForcedOutageSchemaType) => {
        try {
            await axios.post('https://escom-control-backend-production.up.railway.app/api/reports/forced-outages/', {
                feeder: Number(data.feeder),
                report: data.report,
                cause: data.cause,
                remarks: data.remarks,
                installed_capacity: Number(data.installed_capacity),
                number_of_tx: Number(data.number_of_tx),
                affected_areas: data.affected_areas,
                outage_description: data.outage_description,
                hold_date_time_out: data.date_time_out,
                hold_date_time_retored: data.date_time_restored,
                load: Number(data.load)
            })

            router.refresh()

            openChangeWrapper(false)

            form.reset()

            toast({
                title: 'Success',
                description: 'Forced outage has been recorded'
            })
            

        } catch (e) {
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
            <SheetContent className="md:min-w-[550px] overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>Create Forced Outage Record</SheetTitle>
                    <SheetDescription>
                        Please fill in all required fields for this form
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <Form {...form}>
                        <form className="py-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-12 gap-4">
                                <FormField
                                control={form.control}
                                name="feeder"
                                render={({ field }) => (
                                    <FormItem className="mt-2 col-span-6 ">
                                        <FormLabel>Feeder</FormLabel>
                                        <FormDescription>
                                            Select a feeder
                                        </FormDescription>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField
                                name="load"
                                render={({field})=>(
                                    <FormItem className="col-span-6 mt-2">
                                        <FormLabel>Load (Amps)</FormLabel>
                                        <FormDescription>
                                            Load at which feeder opened
                                        </FormDescription>
                                        <FormControl>
                                            <Input type="number" min={1} placeholder="" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid grid-cols-12 gap-4">
                                <FormField
                                control={form.control}
                                name='date_time_out'
                                render={({field})=>(
                                    <FormItem className="pt-2 col-span-6">
                                        <FormLabel>Date & Time Out</FormLabel>
                                        <FormDescription>Time at which lights went out</FormDescription>
                                        <FormControl>
                                            <Input type="datetime-local" placeholder="" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name='date_time_restored'
                                render={({field})=>(
                                    <FormItem className="pt-2 col-span-6">
                                        <FormLabel>Date & Time Restored</FormLabel>
                                        <FormDescription>Time at which lights went out</FormDescription>
                                        <FormControl>
                                            <Input type="datetime-local" placeholder="" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid grid-cols-12 gap-4">
                                <FormField
                                control={form.control}
                                name='number_of_tx'
                                render={({field})=>(
                                    <FormItem className="pt-2 col-span-6">
                                        <FormLabel>Number of TX</FormLabel>
                                        
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field}/>
                                        </FormControl>
                                        <FormDescription>Number of TX &apos; s out</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name='installed_capacity'
                                render={({field})=>(
                                    <FormItem className="pt-2 col-span-6">
                                        <FormLabel>Installed Capacity</FormLabel>
                                        
                                        <FormControl>
                                            <Input type="number" placeholder="" {...field}/>
                                        </FormControl>
                                        <FormDescription>Total installed capacity</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                            control={form.control}
                            name='affected_areas'
                            render={({field})=>(
                                <FormItem >
                                    <FormLabel>Areas Affected</FormLabel>
                                    
                                    <FormControl>
                                        <Input  placeholder="e.g., Bangwe t/c, Bangwe Sec School" {...field}/>
                                    </FormControl>
                                    <FormDescription>All areas affected by the outage</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name='outage_description'
                            render={({field})=>(
                                <FormItem >
                                    <FormLabel>Outage Description</FormLabel>
                                    
                                    <FormControl>
                                        <Input  placeholder="e.g., Between 11KV ...." {...field}/>
                                    </FormControl>
                                    <FormDescription>Decscription of outage</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name='cause'
                            render={({field})=>(
                                <FormItem >
                                    <FormLabel>Outage Description</FormLabel>
                                    <FormControl>
                                        <Input  placeholder="e.g. burnt arrestors" {...field}/>
                                    </FormControl>
                                    <FormDescription>Decscription of outage</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name='remarks'
                            render={({field})=>(
                                <FormItem >
                                    <FormLabel>Remarks</FormLabel>
                                    <FormControl>
                                        <Input  placeholder="" {...field}/>
                                    </FormControl>
                                    <FormDescription>Any other relevant information</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button 
                        variant={'secondary'}
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={form.formState.isSubmitting}
                        >
                            Save Forced Outage
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
 
export default ForcedOutageCreateSheet;