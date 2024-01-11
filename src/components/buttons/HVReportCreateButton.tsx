'use client'

import { FunctionComponent, useState } from "react";
import { Button } from "../ui/button";
import HvReportCreationSheet from "../HVReportCreationSheet";

interface HVReportCreateButtonProps {
    report: BaseReportList
}
 
const HVReportCreateButton: FunctionComponent<HVReportCreateButtonProps> = ({report}) => {

    const [open, setOpen] = useState<boolean>(false);

    const handleOpenChange= (open:boolean) => setOpen(open);

    return ( 
        <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
            <Button onClick={()=>setOpen(true)} className="w-full" variant={'outline'}>
                <span className=" bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-xl font-bold hover:to-orange-800">
                Add HV Report
                </span>
            </Button>
            <HvReportCreationSheet  report={report} open={open} onOpenChange={handleOpenChange}/>
        </div>
    );
}
 
export default HVReportCreateButton;