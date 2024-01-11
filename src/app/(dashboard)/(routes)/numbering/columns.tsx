'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import axios from "axios"
import { MoreHorizontal } from "lucide-react"


export const columns:ColumnDef<MimicNumber>[] = [
    {
        header: 'ID',
        accessorKey: 'pk'
    },
    {
        header: 'Mimic Number',
        accessorKey: 'mimic_number'
    },
    {
        header: 'Feeder',
        accessorKey: 'feeder',
        cell: async ({row})=>{

            const mimicNumber = row.original

            const feederID = Number(mimicNumber.feeder)

            const getFeederDetails = async (number: number) =>{
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/ses-control/feeder-single/${number}/`)
                    // console.log(typeof(response.data))
                    return  response.data
                } catch (e) {
                    console.log(e)
                }
            }

            const feeder: Feeder = await getFeederDetails(feederID)

            return (
                <div>
                    {feeder.feeder}
                </div>
            )
        }
    },
    {
        header: 'Location',
        accessorKey: 'location'
    },
    {
        header: 'Desc',
        accessorKey: 'description'
    },
    {
        header: 'Date',
        accessorKey: 'date'
    },
    // {
    //     header: 'Actions',
    //     id: 'actions',
    //     cell: ({row}) =>{
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant={'ghost'} className="w-8 h-8 p-0">
    //                         <MoreHorizontal className="h-4 w-4"/>
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent>
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem>Edit Record</DropdownMenuItem>
    //                     <DropdownMenuItem
    //                     onClick={()=>{
    //                     }}
    //                     >Delete Record</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     }
    // }
]