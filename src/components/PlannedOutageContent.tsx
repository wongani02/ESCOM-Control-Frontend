'use client'

import { PlusCircle, SearchIcon } from "lucide-react";
import { FunctionComponent, useState } from "react";
import { Button } from "./ui/button";
import PlannedOutageCreateSheet from "./PlannedOutageCreateSheet";
import { BaseReportList } from "@/types/apiSchematypes";

interface PlannedOutageContentProps {
    report: BaseReportList
}
 
const PlannedOutageContent: FunctionComponent<PlannedOutageContentProps> = ({report}) => {

    const [open, setOpen] = useState<boolean>(false);



    return ( 
        <>
            <PlannedOutageCreateSheet
            open={open}
            setOpen={setOpen}
            report_id={report.pk}
            />
            <div className="px-4 lg:px-8">
                <div className="flex flex-row items-center gap-5 top-30 right-20 justify-between">
                    <div className="p-2 rounded-full bg-slate-100 cursor-pointer">
                        <SearchIcon/>
                    </div>
                    <Button onClick={()=>setOpen(true)} variant={'default'}><PlusCircle className="h-5 w-5 mr-2"/> Add Planned Outage</Button>
                </div>   
                    {/* <Empty label="No Mimic Numbers Available." />  */}
                <div className="space-y-4 mt-6 mb-8">
                    {/* mimic number reports */}
                    <div className="mt-4 mb-2">
                        
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default PlannedOutageContent;