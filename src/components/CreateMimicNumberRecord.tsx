'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { MimicNumberSchemaType, MimicRecordSchema } from "@/schema/MimicRecordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


interface CreateMimicNumberDialogProps {
    open: boolean
    setOpen: (open: boolean)=>void
}
 
const CreateMimicNumberDialog: FunctionComponent<CreateMimicNumberDialogProps> = ({open, setOpen}) => {

    const form = useForm<MimicNumberSchemaType>({
        resolver: zodResolver(MimicRecordSchema),
        defaultValues: {

        }
    })

    const openChangeWrapper = (value: boolean) =>{
        setOpen(value);
    }

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

    const router = useRouter()

    const submit = async (data: MimicNumberSchemaType) =>{
        console.log('here')
        try {

            console.log(data.date.toISOString())

            await axios.post(
                'https://escom-control-backend-production.up.railway.app/api/ses-control/mimic-numbers/',{
                    feeder: Number(data.feeder),
                    mimic_number: data.mimicNumber,
                    date: data.date.toISOString().slice(0, 10),
                    size: data.size,
                    description: data.description,
                    location: data.location
                },
            )

            router.refresh()

            openChangeWrapper(false)

            form.reset()

            toast({
                title: 'Success',
                description: 'Mimic record was created successfully'
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
            <DialogContent className="overflow-vertical-scroll">
                <DialogTitle>
                    Create Mimic Number Record
                </DialogTitle>
                <DialogDescription>
                    This record consists of the following fields: 
                </DialogDescription>
                <div className="gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(submit)}>
                            <FormField
                            control={form.control}
                            name="mimicNumber"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Mimic number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg DOL 2397" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
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
                                                    <SelectItem value={`${feeder.pk}`}>{feeder.feeder}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
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
                                        <FormDescription>Date on which the mimic number was introduced</FormDescription>
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
                            name='description'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormDescription>Brief description of the mimic number</FormDescription>
                                    <FormControl>
                                        <Input placeholder="11KV DOL" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name='location'
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormDescription>Location of the mimic number</FormDescription>
                                    <FormControl>
                                        <Input placeholder="e.g., mapanga along mlonda road" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button 
                    disabled={form.formState.isSubmitting}
                    onClick={form.handleSubmit(submit)}
                    className={cn('w-full')}
                    variant={'default'}
                    >Confirm {form.formState.isSubmitting && (<LoaderIcon className="h-6 w-6 animate-spin"/>)}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
 
export default CreateMimicNumberDialog;