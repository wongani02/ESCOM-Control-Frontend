import { Defect } from "@/types/apiSchematypes";
import { ColumnDef } from "@tanstack/react-table";


export const DefectColumns:ColumnDef<Defect>[] = [
    {
        header: 'Date Reported',
        accessorKey: 'date_reported'
    },
    {
        header: 'Description',
        accessorKey: 'description'
    },
    {
        header: 'Responsible Office',
        accessorKey: 'responsible_office'
    },
    {
        header: 'Action Taken',
        accessorKey: 'action_taken'
    },
    {
        header: 'Days Outstanding',
        accessorKey: 'days_outstanding'
    },
    {
        header: 'Remarks',
        accessorKey: 'remarks'
    },
]

