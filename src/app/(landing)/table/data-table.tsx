'use client'

import { FunctionComponent, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadExcel } from "@/lib/xlsx";

interface DataTableComponentProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}
 
export function DataTableComponent<TData, TValue>({
  columns,
  data,
}: DataTableComponentProps<TData, TValue>){

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    // console.log(rowSelection)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })

    return (
        <div>
            {/* filter input */}
            <div className="flex justify-between items-center py-4">
                <div className="flex">
                    <Input
                    className="max-w-sm"
                    placeholder="filter by first and last name"
                    value={table.getColumn('first_name')?.getFilterValue() as string || ''}
                    onChange={e => table.getColumn('first_name')?.setFilterValue(e.target.value)}
                    />

                    <Button className="ml-4 w-60 bg-green-600 hover:bg-green-500 text-white" onClick={()=>downloadExcel()}>
                        Export to Excel
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant={'outline'} className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {table.getAllColumns().filter(column=>column.getCanHide()).map(column=>{
                            return (
                                <DropdownMenuCheckboxItem 
                                key={column.id} 
                                checked={column.getIsVisible()} 
                                onCheckedChange={(value: boolean)=>{
                                    column.toggleVisibility(!!value)
                                }}
                                className="capitalize">
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => {
                            return (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <TableHead key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length?(
                            table.getRowModel().rows.map(row =>{
                                return (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
                        ):(
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No content avalable
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* pagination */}
            <div className="flex items-center justify-start space-x-2 py-4">
                <Button
                variant={'outline'}
                size={'sm'}
                onClick={()=>{
                    table.previousPage()
                }}
                disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                variant={'outline'}
                size={'sm'}
                onClick={()=>{
                    table.nextPage()
                }}
                disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of {""}
                {table.getFilteredRowModel().rows.length} row(s) selected
            </div>
        </div>
        
    )
}
 
export default DataTableComponent;