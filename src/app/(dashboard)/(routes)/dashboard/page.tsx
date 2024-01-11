'use client'

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { 
  Settings, 
  ArrowRight,
  PenBox,
  Hash,
  ZapIcon
} from "lucide-react";
import { useRouter } from 'next/navigation'

const tools = [
    {
        label: 'System Major Events Reports',
        icon: PenBox,
        href: '/ses-reports',
        bgColor: 'bg-violet-500/10',
        color: 'text-violet-500',
    },
    {
        label: 'Mimic Numbers',
        icon: Hash,
        href: '/numbering',
        bgColor: 'bg-pink-500/10',
        color: 'text-pink-700',
    },
    {
        label: 'Transformer Replacement Records',
        icon: ZapIcon,
        href: '/tx-records',
        bgColor: 'bg-orange-500/10',
        color: 'text-orange-700',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
        bgColor: 'bg-emerald-500/10',
        color: 'text-emerald-200',
    },
]

export default function DashboardPage() {

  const router = useRouter()

  return (
    <div>
      
      <div className='mb-8 space-y-4'>
        <h2 className='text-2xl md:text-4xl font-bold text-center'>
          ESCOM RCC Events System
        </h2>
        <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>
          Explore the power of innovation
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool)=>(
          <Card onClick={()=>{router.push(tool.href)}}
          key={tool.href} className="p-4 transition border-black/5 flex items-center justify-between hover:shadow-md cursor-pointer">
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
        ))}
      </div>
    </div>
  )
}
