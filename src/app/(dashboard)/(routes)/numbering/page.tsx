import Heading from "@/components/Heading";
import MimicNumberContentSection from "@/components/MimicNumberContentSection";
import axios from "axios";
import { Hash } from "lucide-react";
import { FunctionComponent } from "react";
import MimicTableComponent from "./dataTable";
import { columns } from "./columns";

interface PageProps {
    
}

const fetchMimicNumbers = async () =>{
    try {
        const response = await axios.get('https://escom-control-backend-production.up.railway.app/api/ses-control/mimic-numbers/')

        console.log(typeof(response.data))

        return  response.data
    } catch (e) {
        console.log(e)
    }
}
 
const Page: FunctionComponent<PageProps> = async () => {

    const data: MimicNumber[]  = await fetchMimicNumbers()

    return ( 
        <>
            <Heading
            title="Mimic Numbers"
            description="This section consists of all mimic number available on the southern region distribution grid"
            icon={Hash}
            bgColor="bg-pink-500/10"
            iconColor="text-pink-700"
            />
            <MimicNumberContentSection/>
            <div className="container py-10 mx-auto">
                <MimicTableComponent columns={columns} data={data}/>
            </div>
        </>
     );
}
 
export default Page;