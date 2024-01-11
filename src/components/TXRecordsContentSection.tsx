'use client'

import { FunctionComponent, useState } from "react";
import CreateTXRecordDialog from "./CreateTXRecordDialog";
import { PlusCircle, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

interface TxRecordsContentProps {
    
}
 
const TxRecordsContent: FunctionComponent<TxRecordsContentProps> = () => {

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

    return ( 
        <>
            <CreateTXRecordDialog
            open={showCreateModal}
            setOpen={setShowCreateModal}
            />
            <div className="px-4 lg:px-8">
                <div className="flex flex-row items-center gap-5 top-30 right-20 justify-between">
                    <div className="p-2 rounded-full bg-slate-100 cursor-pointer">
                        <SearchIcon/>
                    </div>
                    <Button onClick={()=>setShowCreateModal(true)} variant={'default'}><PlusCircle className="h-5 w-5 mr-2"/> Add TX Replacement Record</Button>
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
 
export default TxRecordsContent;