'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideBar from "./SideBar";

interface MobileSideBarProps {
    
}
 
const MobileSideBar: FunctionComponent<MobileSideBarProps> = () => {

    const [isMounted, setIsMoutend] = useState<boolean>(false);

    useEffect(()=>{
        setIsMoutend(true);
    }, []);

    if (!isMounted) return null

    return ( 
        <Sheet>
            <SheetTrigger>
                <Button variant={'ghost'} className='md:hidden' size={'icon'}>
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent className="p-0" side={'left'}>
                <SideBar/>
            </SheetContent>
        </Sheet>
        
    );
}
 
export default MobileSideBar;