import Heading from "@/components/Heading";
import TxRecordsContent from "@/components/TXRecordsContentSection";
import DataTableComponent from "@/components/dataTableComponent";
import axios from "axios";
import { Zap } from "lucide-react";
import { FunctionComponent } from "react";
import { columns } from "./columns";


const fetchTXRecords = async () =>{
    try {
        const response = await axios.get('https://escom-control-backend-production.up.railway.app/api/ses-control/tx-records/')

        console.log(typeof(response.data))

        return  response.data
    } catch (e) {
        console.log(e)
    }
}

interface PageProps {
    
}
 
const Page: FunctionComponent<PageProps> = async() => {

    const data: TXReplacementRecord[] = await fetchTXRecords();

    return ( 
        <>
            <Heading
            title="TX Replacement Records"
            description="This section of the system contains all transformer replacement records"
            icon={Zap}
            bgColor="bg-orange-500/10"
            iconColor="text-orange-700"
            />
            <TxRecordsContent/>
            <div className="container py-10 mx-auto">
                <DataTableComponent columns={columns} data={data} filterField="substation_number"/>
            </div>
        </>
     );
}
 
export default Page;