import { PlannedOutage } from "@/types/apiSchematypes";
import { ColumnDef } from "@tanstack/react-table";


export const PlannedOutageColumns:ColumnDef<PlannedOutage>[] = [
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
        header: 'Planned D&T-O',
        accessorKey: 'planned_date_time_out',
    },
    {
        header: 'Planned D&T-R',
        accessorKey: 'planned_date_time_restored',
    },
    {
        header: 'Actual D&T-O',
        accessorKey: 'actual_date_time_out',
    },
    {
        header: 'Actual D&T-R',
        accessorKey: 'actual_date_time_restored',
    },
    {
        header: 'cause',
        accessorKey: 'cause'
    }
]
