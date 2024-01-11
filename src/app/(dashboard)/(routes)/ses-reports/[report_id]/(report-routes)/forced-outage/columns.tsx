import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";



export const ForcedOutageColumns:ColumnDef<ForcedOutage>[] = [
    {
        header: 'ID',
        accessorKey: 'pk'
    },
    {
        header: 'Feeder',
        accessorKey: 'feeder.feeder'
    },
    {
        header: 'Outage Desc',
        accessorKey: 'outage_description'
    },
    {
        header: 'affected', 
        accessorKey: 'affected_areas',
    },
    {
        header: 'Date Out',
        accessorKey: 'date_time_out',
        // cell: ({row})=>{
        //     const dateString = row.original;

        //     const date_time_out = dateString.date_time_out;

        //     const date = new Date(date_time_out)

        //     const formattedDate = format(date, "yyyy-MM-dd HH:mm:ssxxx");

        //     return (
        //         <div>
        //             {formattedDate}
        //         </div>
        //     )
        // }
    },
    {
        header: 'Date Restored',
        accessorKey: 'date_time_restored',
    },
    {
        header: 'Remarks',
        accessorKey: 'remarks'
    }
]
