import { FunctionComponent } from "react";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, PenLineIcon } from "lucide-react";
import { BaseReport } from "@/types/apiSchematypes";

interface BaseReportCardProps {
    reports: BaseReport[]
}
 
const BaseReportCard: FunctionComponent<BaseReportCardProps> = ({reports}) => {
    return ( 
        <> 
            {reports.map((report) =>(
                <div key={report.pk} className="max-w-[650px] mt-2 flex-col justify-center items-center mx-auto">
                <Link className="flex items-center justify-center hover:shadow-md" href={`/ses-reports/${report.pk}`}>
                    <Card className="p-4 items-center">
                        <CardTitle className="text-xl font-semibold flex justify-between">
                            <div className="text-gray-700 flex">
                                <div className={'p-2 w-fit rounded-md items-center text-emerald-500'}>
                                    <PenLineIcon className="h-4 w-4"/>
                                </div>
                                {report.name}
                            </div>
                            <div className="text-gray-700 flex">
                                <div className={'p-2 w-fit rounded-md items-center text-emerald-500'}>
                                    <Calendar className="h-4 w-4"/>
                                </div>
                                {report.date}
                            </div>
                        </CardTitle>
                        <CardDescription>
                            This report contains sections; HV faults, Planned outages, Forced outages, Load shedding and Defects. <br />
                            <span className="text-sm">Created at {report.created}</span>
                        </CardDescription>
                    </Card>
                </Link>
            </div>
            ) )}
        </>
        
     );
}
 
export default BaseReportCard;