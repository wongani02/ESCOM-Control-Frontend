import React from 'react'
import { FunctionComponent } from 'react'
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { 
  ArrowRight,
  PenBox,
  ZapIcon,
  Factory,
  LightbulbOff,
  CalendarCheck2,
  FileWarning
} from "lucide-react";
import Heading from '@/components/Heading';
import Link from 'next/link';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';


const tools = [
    {
        label: 'High Voltage Faults',
        icon: ZapIcon,
        href: 'hv-faults',
        bgColor: 'bg-violet-500/10',
        color: 'text-violet-500',
    },
    {
        label: 'Forced Outages',
        icon: FileWarning,
        href: 'forced-outage',
        bgColor: 'bg-pink-500/10',
        color: 'text-pink-700',
    },
    {
        label: 'Planned outages',
        icon: CalendarCheck2,
        href: 'planned-outage',
        bgColor: 'bg-orange-500/10',
        color: 'text-orange-700',
    },
    {
        label: 'Load Shedding',
        icon: LightbulbOff,
        href: 'load-shedding',
        bgColor: 'bg-emerald-500/10',
        color: 'text-emerald-600',
    },
    {
        label: 'Defects',
        icon: Factory,
        href: 'defects',
        bgColor: 'bg-emerald-500/10',
        color: 'text-emerald-200',
    },
]


const fetchReport = async (id: number) =>{
  try {
    const data = await axios.get(`https://escom-control-backend-production.up.railway.app/api/reports/base-report-detail/${id}/`);

    return data.data

  }catch (e) {
    console.log(e)
    toast({
      title: 'Error',
      description: 'Failed to fetch resources, please make sure you\'re connected to the internet',
      variant: 'destructive'
    })
  }
}


interface PageProps {
    params : {
      report_id: number
    }
}
 
const Page: FunctionComponent<PageProps> = async ({params}) => {

  const data: BaseReportList = await fetchReport(params.report_id);

  return ( 
      <div>
      <Heading
      title='Report Sections'
      description={`Below are the sections for ${data.name} - ${data.date}`}
      iconColor='text-violet-500'
      icon={PenBox}
      bgColor={'bg-violet-500/10'}
      />
      <div className="px-4 md:px-20 mt-4 lg:px-32 space-y-4">
        {tools.map((tool)=>(
          <Link className='' href={`${params.report_id}/${tool.href}`}>
            <Card
            key={tool.href} className="p-4 mt-4 transition border-black/5 flex items-center justify-between hover:shadow-md cursor-pointer">
              <div className="items-center flex gap-x-4">
                <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                  <tool.icon className={cn('w-6.5 h-6.5 ', tool.color)}/>
                </div>
                <div className="font-semibold">
                  {tool.label}
                </div>
              </div>
              <ArrowRight className="w-5 h-5"/>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
 
export default Page;