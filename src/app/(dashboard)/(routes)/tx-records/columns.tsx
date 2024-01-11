import { ColumnDef } from "@tanstack/react-table";



export const columns:ColumnDef<TXReplacementRecord>[] = [
    {
        header: 'ID',
        accessorKey: 'pk'
    },
    {
        header: 'Date',
        accessorKey: 'date'
    },
    {
        header: 'Feeder',
        accessorKey: 'feeder.feeder',
    },
    {
        header: 'Location',
        accessorKey: 'location',
    },
    {
        header: 'S/S Number',
        accessorKey: 'substation_number'
    },
    {
        header: 'Serial Number',
        accessorKey: 'serial_number'
    },
    {
        header: 'Manufacturer',
        accessorKey: 'manufacturer',
    },
    {
        header: 'Year',
        accessorKey: 'year',
    },
    {
        header: 'Remarks',
        accessorKey: 'remarks'
    }

]