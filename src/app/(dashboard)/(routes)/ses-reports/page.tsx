import Heading from "@/components/Heading";
import { PenBox } from "lucide-react";
import { FunctionComponent } from "react";
import axios from "axios";
import SESContentSection from "@/components/ses-content-setion";


const fetchReports = async () =>{
    try {
        const response = await axios.get('https://escom-control-backend-production.up.railway.app/api/reports/base-report-create/')

        console.log(typeof(response.data))

        return  response.data
    } catch (e) {
        console.log(e)
    }
}

interface PageProps {
    
}
 
const Page: FunctionComponent<PageProps> = async () => {

    const reports: BaseReport[] = await fetchReports()

    return ( 
        <>
            <div>
                <Heading 
                title="SES Report"
                description="Our Most Advanced Conversation Model"
                icon={PenBox}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
                />
                <SESContentSection reports={reports}/>
            </div>
        </>
     );
}
 
export default Page;

