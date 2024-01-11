import { ColumnDef } from "@tanstack/react-table";


export const HVColumns:ColumnDef<HVReport>[] = [
    {
        header: 'ID',
        accessorKey: 'pk',
    },
    {
        header: 'FEEDER',
        accessorKey: 'feeder.feeder',
    },
    {
        header: 'OUTAGE',
        accessorKey: 'outage_description'
    },
    {
        header: 'D&T Out',
        accessorKey: 'date_time_out'
    },
    {
        header: 'D&T Resotored',
        accessorKey: 'date_time_restored'
    },
    {
        header: 'Remarks',
        accessorKey: 'remarks'
    },
    {
        header: 'Cause',
        accessorKey: 'cause'
    },
]
