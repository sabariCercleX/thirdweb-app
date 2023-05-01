import {
  Column,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  flexRender,
} from "@tanstack/react-table";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import React from "react";
import { Box, IconButton, TableBody, TableHead } from "@mui/material";
//import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledTableCell,
  StyledTableHeadRow,
  StyledTableRow,
  StyledTableView,
} from "./TableStyle";
import Iconify from "./Iconify";
import CustomTablePagination from "./CustomTablePagination";



const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export default function CustomTable({
  data,
  columns,
  tabs,
  tabColumnName,
  actions,
}) {
  const [columnFilters, setColumnFilters] = React.useState(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "id") {
      if (table.getState().sorting[0]?.id !== "id") {
        table.setSorting([{ id: "id", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  console.log(data)

  return (
    <Box>
      
      
        <StyledTableView sx={{ overflowX: "scroll" }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <StyledTableHeadRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                          {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                        </>
                      )}
                    </th>
                  );
                })}
                {actions.length > 0 && <th>Actions</th>}
              </StyledTableHeadRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    
                    return (
                      <StyledTableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </StyledTableCell>
                    );
                  })}
                  {actions.length > 0 && (
                    <StyledTableCell key={row.id} sx={{ padding: 0 }}>
                      {actions.map((action) => {
                        return (
                          <IconButton
                            color="inherit"
                            onClick={() =>
                              action.onClick(
                                row.getValue(action.actionDataColumn)
                              )
                            }
                            aria-label={action.actionName}
                            sx={{ padding: 0, width: 20, height: 20, mx: 1 }}
                          >
                            <Iconify
                              id={row.getValue(action.actionDataColumn)}
                              icon={action.icon}
                              sx={{ padding: 0 }}
                            />
                          </IconButton>
                        );
                      })}
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </StyledTableView>
        <Box />
        <CustomTablePagination table={table} />
      </Box>
    
  );
}

function Filter({
  column,
  table,
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue)?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [value, old?.[1]])
          }
          placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ""
            }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue)?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old) => [old?.[0], value])
          }
          placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ""
            }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "")}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
