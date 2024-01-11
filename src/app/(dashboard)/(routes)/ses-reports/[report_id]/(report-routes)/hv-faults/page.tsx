import Heading from "@/components/Heading";
import HVReportCreateButton from "@/components/buttons/HVReportCreateButton";
import DataTableComponent from "@/components/dataTableComponent";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { ZapIcon } from "lucide-react";
import { FunctionComponent } from "react";
import { HVColumns } from "./columns";

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
    // toast({
    //   title: 'Error',
    //   description: 'Failed to fetch resources, please make sure you\'re connected to the internet',
    //   variant: 'destructive'
    // })
  }
}
 
const Page: FunctionComponent<PageProps> = async ({params}) => {

  const report:BaseReportList = await fetchReport(params.report_id) 


  return ( 
      <div>
        <Heading
        title="HV Reports"
        description={`This section consists of all trips that happen on`}
        icon={ZapIcon}
        bgColor="bg-orange-500/10"
        iconColor="text-orange-700"
        />
        <div className="px-4 lg:px-8">
          <div className="max-w-[600px] ">
              <HVReportCreateButton report={report}/>
          </div>
          <DataTableComponent columns={HVColumns} data={report.hv_report} filterField="outage_description"/>
        </div>
      </div>
  );
}
 
export default Page;
