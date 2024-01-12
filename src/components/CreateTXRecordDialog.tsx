'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TXRecordSchema, TXRecordSchemaType } from "@/schema/TXRecordSchema";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn, wait } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { toast } from "./ui/use-toast";
import { Feeder } from "@/types/apiSchematypes";


interface CreateTXRecordDialogProps {
    open: boolean
    setOpen: (open: boolean)=>void
}
 
const CreateTXRecordDialog: FunctionComponent<CreateTXRecordDialogProps> = ({open, setOpen}) => {

    const openChangeWrapper = (value: boolean) =>{
        setOpen(value);
    }

    const [feeders, setFeeders] = useState<Feeder[]>([]);

    useEffect(()=>{
        const fetchFeeders = async () =>{
            const feederList = await axios.get('https://escom-control-backend-production.up.railway.app/api/ses-control/feeders/');
            // console.log(feederList)
            const data:Feeder[] = await feederList.data;

            setFeeders(data);
        }
        
        fetchFeeders();

    }, [])

    const form = useForm<TXRecordSchemaType>({
        resolver: zodResolver(TXRecordSchema),
        defaultValues: {

        }
    })

    const onSubmit = async (data: TXRecordSchemaType) =>{
        try {
            await wait(5000);
            toast({
                title: 'Success',
                description: 'HV record created successfully'
            })
        }catch (e){
            console.log(e)
        }
    }

    return ( 
        <Sheet open={open} onOpenChange={openChangeWrapper}>
            <SheetContent className="md:min-w-[550px] overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>
                        Add Transformer Replacemnt Record
                    </SheetTitle>
                    <SheetDescription>
                        Fill in all the fields to add a transformer replacement record.
                    </SheetDescription>
                </SheetHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}> 
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
                                control={form.control}
                                name='serial_number'
                                render={({field})=>(
                                    <FormItem className="col-span-6 mt-2">
                                        <FormLabel>Serial Number</FormLabel>
                                        <FormDescription>Transformer serial number</FormDescription>
                                        <FormControl>
                                            <Input placeholder="eg. rer.343.2" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid grid-cols-12 gap-4">
                                <FormField
                                control={form.control}
                                name='substation_number'
                                render={({field})=>(
                                    <FormItem className="col-span-6 mt-2">
                                        <FormLabel>Substation Number</FormLabel>
                                        <FormDescription>Transformer substation number</FormDescription>
                                        <FormControl>
                                            <Input placeholder="eg. 3423" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                                <FormField
                                control={form.control}
                                name='location'
                                render={({field})=>(
                                    <FormItem className="col-span-6 mt-2">
                                        <FormLabel>Location</FormLabel>
                                        <FormDescription>Location of TX substation</FormDescription>
                                        <FormControl>
                                            <Input placeholder="eg. mlombe" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <div className="grid grid-cols-12 gap-4">
                                <FormField
                                control={form.control}
                                name="date"
                                render={
                                    ({field})=>(
                                        <FormItem className="pt-2 col-span-6">
                                            <FormLabel>Date out</FormLabel>
                                            <FormDescription>Date of replacement</FormDescription>
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
                                <FormField
                                control={form.control}
                                name='capacity'
                                render={({field})=>(
                                    <FormItem className="col-span-6 mt-2">
                                        <FormLabel>Capacity</FormLabel>
                                        <FormDescription>Transformer capacity</FormDescription>
                                        <FormControl>
                                            <Input placeholder="eg. 400KVA" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name='remarks'
                                render={({field})=>(
                                    <FormItem className="col-span-6 mt-2">
                                        <FormLabel>Remarks</FormLabel>
                                        <FormDescription>Replacement remarks</FormDescription>
                                        <FormControl>
                                            <Input placeholder="e.g., replaced due to low voltage" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <div className="flex flex-col gap-3 mt-4">
                        <Button 
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                        variant={'secondary'}>
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
 
export default CreateTXRecordDialog;