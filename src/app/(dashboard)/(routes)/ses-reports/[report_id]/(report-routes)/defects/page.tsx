import DefectsContent from "@/components/DefectsContent";
import Heading from "@/components/Heading";
import DataTableComponent from "@/components/dataTableComponent";
import { Factory } from "lucide-react";
import { FunctionComponent } from "react";
import { DefectColumns } from "./columns";
import axios from "axios";

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
            title="Defects"
            description="This section of the report contains all defects recorded throughout thr 24hrs"
            icon={Factory}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
            />
            <div>
                <DefectsContent report={report}/>
            </div>
            <div className="container py-10 mx-auto">
                <DataTableComponent columns={DefectColumns} data={report.defect_records} filterField="description"/>
            </div>
        </div>
    );
}
 
export default Page;