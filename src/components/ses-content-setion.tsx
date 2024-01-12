'use client'

import { FunctionComponent, useState } from "react";
import CreateBaseReportDialog from "./CreateBaseReportDialog";
import { Button } from "./ui/button";
import { PlusCircle, SearchIcon } from "lucide-react";
import BaseReportCard from "./BaseReportCard";
import { Empty } from "./Empty";
import { BaseReport } from "@/types/apiSchematypes";

interface SESContentSectionProps {
    reports: BaseReport[]
}
 
const SESContentSection: FunctionComponent<SESContentSectionProps> = ({reports}) => {

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)


    return ( 
        <>
            <CreateBaseReportDialog
            open={showCreateModal}
            setOpen={setShowCreateModal}
            />
            <div className="px-4 lg:px-8">
                <div className="flex flex-row items-center gap-5 top-30 right-20 justify-between">
                    <div className="p-2 rounded-full bg-slate-100 cursor-pointer">
                        <SearchIcon/>
                    </div>
                    <Button onClick={()=>setShowCreateModal(true)} variant={'default'}><PlusCircle className="h-5 w-5 mr-2"/> Create New Report</Button>
                </div>   
                {reports.length === 0 && (
                    <Empty label="No Reports Available." />
                )} 
                <div className="space-y-4 mt-6 mb-8">
                    {/* base reports */}
                    <div className="mt-4 mb-2">
                        <BaseReportCard reports={reports}/>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default SESContentSection;
