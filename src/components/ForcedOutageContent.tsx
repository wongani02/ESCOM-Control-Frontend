'use client'

import { FunctionComponent, useState } from "react";
import ForcedOutageCreateSheet from "./ForcedOutageCreateSheet";
import { set } from "date-fns";
import { Button } from "./ui/button";
import { PlusCircle, SearchIcon } from "lucide-react";

interface ForcedOutageContentProps {
    report: BaseReportList
}
 
const ForcedOutageContent: FunctionComponent<ForcedOutageContentProps> = ({report}) => {

    const  [open, setOpen] = useState<boolean>(false)

    return ( 
        <>
            <ForcedOutageCreateSheet
            open={open}
            setOpen={setOpen}
            report_id={report.pk}
            />
            <div className="px-4 lg:px-8">
                <div className="flex flex-row items-center gap-5 top-30 right-20 justify-between">
                    <div className="p-2 rounded-full bg-slate-100 cursor-pointer">
                        <SearchIcon/>
                    </div>
                    <Button onClick={()=>setOpen(true)} variant={'default'}><PlusCircle className="h-5 w-5 mr-2"/> Add Forced Outage</Button>
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
 
export default ForcedOutageContent;