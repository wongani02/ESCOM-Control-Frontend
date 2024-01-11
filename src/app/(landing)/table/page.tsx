import { FunctionComponent } from "react";
import DataTableComponent from "./data-table";
import { columns } from "./columns";
import { data } from "@/dummy/data";

interface PageProps {
    
}
 
const Page: FunctionComponent<PageProps> = () => {
    return ( 
        <div className="container py-10 mx-auto">
            <DataTableComponent columns={columns} data={data}/>
        </div>
        
    );
}
 
export default Page;