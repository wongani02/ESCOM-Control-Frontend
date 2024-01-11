import { FunctionComponent } from "react";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ui/toaster";

interface DashboardLayoutProps {
    children: React.ReactNode
}
 
const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({children}) => {
    return ( 
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 ">
                <SideBar/>
            </div>
            <main className="md:pl-72">
                <Navbar/>
                {children}
                <Toaster/>
            </main>
        </div>
     );
}
 
export default DashboardLayout;