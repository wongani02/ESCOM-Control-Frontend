"use client"

import FeederTableRowValue from "@/components/feederTableRow";
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
        accessorKey: 'feeder',
        cell: ({row})=>{

            const txRecord = row.original

            const feederID = Number(txRecord.feeder)

            // const getFeederDetails = async (number: number) =>{
            //     try {
            //         const response = await axios.get(`https://escom-control-backend-production.up.railway.app/ses-control/feeder-single/${number}/`)
            //         // console.log(typeof(response.data))
            //         return  response.data
            //     } catch (e) {
            //         console.log(e)
            //     }
            // }

            // const feeder: Feeder = await getFeederDetails(feederID)

            return (
                <div>
                    {/* Bangwe 105 */}
                    <FeederTableRowValue id={feederID}/>
                </div>
            )
        }
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