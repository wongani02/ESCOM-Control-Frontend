'use client'

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";
import { LayoutDashboard, PenBox, Settings, ZapIcon, HashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {usePathname} from 'next/navigation'


const montserat = Montserrat({weight: '600', subsets: ['latin']})

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'SES Reports',
        icon: PenBox,
        href: '/ses-reports',
        color: 'text-violet-500',
    },
    {
        label: 'Mimic Numbering',
        icon: HashIcon,
        href: '/numbering',
        color: 'text-pink-700',
    },
    {
        label: 'TX Records',
        icon: ZapIcon,
        href: '/tx-records',
        color: 'text-orange-700',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
]

interface SideBarProps {
    
}
 
const SideBar: FunctionComponent<SideBarProps> = () => {

    const pathName = usePathname()

    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="flex-1 px-3 py-2">
                <Link href={'/dashboard'} className="flex items-center pl-3 mb-14">
                    <div className="mr-4 w-8 h-8 relative">
                        <Image
                        alt="logo"
                        fill
                        src={'/logo.png'}
                        />
                    </div>
                    <h1 className={cn(`text-2xl font-bold`, montserat)}>
                        RCC
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route)=>(
                        <Link className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition rounded-lg", pathName == route.href ? 'text-white bg-white/10': 'text-zinc-400')}
                        key={route.href} href={route.href}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn(`mr-3 h-5 w-5`, route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default SideBar;