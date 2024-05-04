import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

type Product = {
  sku: string;
  productName: string;
  status: string;
  quantity: number;
  dateCreated: string; // Or you can use Date type if you prefer
};

const ProductsTable = () => {
  const dummy = [
    {
      sku: 'ABC123',
      productName: 'Example Product 1',
      status: 'available',
      quantity: 10,
      dateCreated: '2024-05-01T08:00:00Z',
    },
    {
      sku: 'XYZ456',
      productName: 'Example Product 2',
      status: 'out of stock',
      quantity: 0,
      dateCreated: '2024-04-30T14:30:00Z',
    },
    {
      sku: 'DEF789',
      productName: 'Example Product 3',
      status: 'on hold',
      quantity: 5,
      dateCreated: '2024-04-29T10:15:00Z',
    },
  ];
  const [data, setData] = useState<Product[]>(dummy);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const handleSorting = (accessorKey: string) => {
    const currentSorting = sorting.slice();
    const sortIndex = currentSorting.findIndex(
      (item) => item.id === accessorKey,
    );
    const newSortingOrder = !currentSorting[sortIndex]?.desc ?? false;

    if (sortIndex < 0) {
      currentSorting.push({ id: accessorKey, desc: newSortingOrder });
    } else {
      currentSorting[sortIndex] = { id: accessorKey, desc: newSortingOrder };
    }
    setSorting(currentSorting);
  };
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'sku',
        header: 'SKU',
        cell: (props) => {
          return <p>{props.getValue()}</p>;
        },
      },
      {
        accessorKey: 'productName',
        header: 'Product Name',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: (props) => <p>{props.getValue()}</p>,
      },
      {
        accessorKey: 'dateCreated',
        header: 'Date Created',
        cell: (props) => <p>{new Date(props.getValue()).toDateString()}</p>,
      },
    ],
    [],
  );
  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    // sortingFns: {
    //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    // },
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      sorting,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
    // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
    // enableSorting: false, // - default on/true
    // enableSortingRemoval: false, //Don't allow - default on/true
    // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
    // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity
  });

  const tableHeaders = table.getHeaderGroups();

  const TableRows = () =>
    table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ));

  return (
    <table className="text:xs mt-5 table w-full table-auto  overflow-scroll overflow-x-auto whitespace-nowrap  md:text-sm lg:whitespace-break-spaces  ">
      <thead className="  border-b  md:table-header-group">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={`bg-secondary p-4 ${index === 0 && 'rounded-l-lg'} ${index === headerGroup.headers.length - 1 && 'rounded-r-lg'}`}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b">
            {row.getVisibleCells().map((cell) => {
              return (
                <td
                  key={cell.id}
                  className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
