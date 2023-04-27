import { Box, Button, Select, TextField, Typography, MenuItem } from '@mui/material'
import React from 'react'

function CustomTablePagination({table}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: 40, alignItems: 'center' }}>
            <Button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </Button>
            <Button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </Button>
            <Button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </Button>
            <Button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              sx={{ width: 40, height: 40 }}
            >
              {'>>'}
            </Button>
            <Box className="flex items-center gap-1">
              <Box>Page
                <Typography variant='button'>
                  {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </Typography>
              </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mx: 3 }}>
              <Box sx={{ mx: 2 }}>
                | Go to page:
              </Box>
              <TextField
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
                size='small'
              />
            </Box>
            <Select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
              sx={{ my: 2 }}
              size='small'
            >
              {[10, 20, 30, 50, 100].map(pageSize => (
                <MenuItem key={pageSize} value={pageSize}>
                  Show {pageSize}
                </MenuItem>
              ))}
            </Select>
          </Box>
  )
}

export default CustomTablePagination