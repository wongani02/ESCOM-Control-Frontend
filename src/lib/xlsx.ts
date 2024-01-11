import { data } from '@/dummy/data'
import xlsx, { IJsonSheet } from 'json-as-xlsx'

export function downloadExcel(){
    let columns:IJsonSheet[] = [
        {
            sheet: 'People',
            columns: [
                {label: 'ID', value:'id'},
                {label: 'First Name', value:'first_name'},
                {label: 'Last Name', value:'last_name'},
                {label: 'Email', value:'email'},
                {label: 'Gender', value:'gender'},
                {label: 'IP Address', value:'ip_address'},
            ],
            content: data
        }
    ]

    let settings = {
        fileName: 'People',
    }

    xlsx(columns, settings)
}