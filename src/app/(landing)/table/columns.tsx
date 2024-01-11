'use client'

import { Button } from "@/components/ui/button"
import { Person } from "@/dummy/data"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"


export const columns: ColumnDef<Person>[] = [
    {
        id: 'select',
        header: ({table})=>{
            return (
                <Checkbox 
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value)=>{
                    table.toggleAllPageRowsSelected(!!value)
                }}
                /> 
            )
        },
        cell: ({row})=>{
            return (
                <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value)=>{
                    row.toggleSelected(!!value)
                }}
                />
            )
        },
        enableSorting: false,
        enableHiding: false
    },
    {
        header: ({column})=>{
            return (
                <Button variant={'ghost'} onClick={()=>{
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }}>
                    ID <ArrowUpDown className="ml-2 h-4 w-4 p-0"/>
                </Button>
            )
        },
        accessorKey: 'id'
    },
    {
        header: 'FIRST NAME',
        accessorKey: 'first_name'
    },
    {
        header: 'LAST NAME',
        accessorKey: 'last_name'
    },
    {
        header: 'EMAIL',
        accessorKey: 'email'
    },
    {
        header: 'GENDER',
        accessorKey: 'gender'
    },
    {
        header: 'IP ADDRESS',
        accessorKey: 'ip_address'
    },
    {
        header: 'ACTIONS',
        id: 'actions',
        cell: ({row})=>{

            const person = row.original;

            const personIpAddress = person.ip_address;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className="w-8 h-8 p-0">
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        onClick={()=>{
                            navigator.clipboard.writeText(personIpAddress);
                            toast({
                                title: 'Copied to clipboard'
                            })
                        }}
                        >Copy IP address</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]