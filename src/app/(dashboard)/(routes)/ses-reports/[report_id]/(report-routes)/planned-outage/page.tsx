import Heading from "@/components/Heading";
import PlannedOutageContent from "@/components/PlannedOutageContent";
import DataTableComponent from "@/components/dataTableComponent";
import axios from "axios";
import { Calendar, CalendarCheck2 } from "lucide-react";
import { FunctionComponent } from "react";
import { PlannedOutageColumns } from "./columns";


interface PageProps {
  params: {
    report_id: number
  }
}

const fetchReport = async (id: number) =>{
  try {
    const data = await axios.get(`http://127.0.0.1:8000/api/reports/base-report-detail/${id}/`);

    return data.data

  }catch (e) {
    console.log(e)
  }
}
 
const Page: FunctionComponent<PageProps> = async({params}) => {

    const report:BaseReportList = await fetchReport(params.report_id) 

    return ( 
        <div>
            <Heading
            title="Planned Outages"
            description="This section contains all planned outages"
            icon={CalendarCheck2}
            iconColor="text-orange-700"
            bgColor="bg-orange-500/10"
            />
            <div>
                <PlannedOutageContent report={report}/>
            </div>
            <div className="container mx-auto py-4">
                <DataTableComponent 
                columns={PlannedOutageColumns} 
                data={report.planned_outage_records}
                filterField="outage_description"
                />
            </div>
        </div>
    );
}
 
export default Page;