import ForcedOutageContent from "@/components/ForcedOutageContent";
import Heading from "@/components/Heading";
import DataTableComponent from "@/components/dataTableComponent";
import { FileWarning } from "lucide-react";
import { FunctionComponent } from "react";
import { ForcedOutageColumns } from "./columns";
import axios from "axios";
import { BaseReportList } from "@/types/apiSchematypes";


interface PageProps {
  params: {
    report_id: number
  }
}

const fetchReport = async (id: number) =>{
  try {
    const data = await axios.get(`https://escom-control-backend-production.up.railway.app/api/reports/base-report-detail/${id}/`);

    return data.data

  }catch (e) {
    console.log(e)
  }
}

 
const Page: FunctionComponent<PageProps> = async({params}) => {

    const report:BaseReportList = await fetchReport(params.report_id) 

    return ( 
        <>
            <Heading
            title="Forced Outages"
            description="This Section consists of all forced outages for the 24hrs"
            icon={FileWarning}
            iconColor="text-pink-700"
            bgColor="bg-pink-500/10"
            />
            <div>
                <ForcedOutageContent report={report}/>
            </div>
            <div className="container py-10 mx-auto">
                <DataTableComponent columns={ForcedOutageColumns} data={report.forced_outage_records} filterField="outage_description"/>
            </div>
        </>
    );
}
 
export default Page;