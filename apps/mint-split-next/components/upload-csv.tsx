import { ChangeEvent, ReactElement } from 'react';
import Papa from 'papaparse';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Alert, Button, Tooltip } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React from 'react';
import { MintCsvSchema } from './zod/csv-schema';

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: true,
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 300,
        editable: true,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 160,
        editable: true,
        valueFormatter: ({ value }) => `$${value}`,
    },
    {
        field: 'transactionType',
        headerName: 'Transaction Type',
        width: 160,
        editable: true,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 160,
        editable: true,
    },
    {
        field: 'accountName',
        headerName: 'Account Name',
        width: 160,
        editable: true,
    },
];

// TODO: Add loading spinner for data grid
// TODO: color code values to easily see large transactions
// TODO: add delete row capability
// TODO: add saved state cookie/local storage (in progress)
const pageSizeOptions: number[] = [5, 10, 25, 50];

export default function UploadCsv(): ReactElement {
    const [data, setData] = React.useState<MintCsvSchema>([]);
    const [error, setError] = React.useState<string | undefined>(undefined);
    // "Date","Description","Original Description","Amount","Transaction Type","Category","Account Name","Labels","Notes"

    const handleCsvFile = (e: ChangeEvent) => {
        const files = (e.target as HTMLInputElement).files;
        console.log(files);
        if (files) {
            const file = files[0];
            Papa.parse(file, {
                complete: function (results) {
                    const res = results.data.map((item: any, index) => {
                        return {
                            id: index,
                            date: item[0],
                            description: item[1],
                            originalDescription: item[2],
                            amount: item[3],
                            transactionType: item[4],
                            category: item[5],
                            accountName: item[6],
                            labels: item[7],
                            notes: item[8],
                        };
                    });
                    console.log('data', res);

                    const parse = MintCsvSchema.safeParse(res);
                    if (!parse.success) {
                        console.log('parse failed', parse);
                        setError(
                            "Unable to parse CSV file. Please verify the csv file's format."
                        );
                        return;
                    }
                    console.log('res', res);
                    setData(res);
                    setError(undefined);
                    return results.data;
                },
            });
        }
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport
                    csvOptions={{
                        fileName: `mint-split-${new Date()
                            .toISOString()
                            .slice(0, 10)}.csv`,
                        delimiter: ',',
                    }}
                />
                <Button variant="text" onClick={setData.bind(this, [])}>
                    <UndoIcon />
                    Reset
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <div>
            <Box sx={{ height: '90vh', width: '100%' }}>
                {error ? <Alert severity="error">{error}</Alert> : null}
                {data.length ? (
                    <DataGrid
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: pageSizeOptions[2],
                                },
                            },
                        }}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0
                                ? 'Mui-even'
                                : 'Mui-odd'
                        }
                        pageSizeOptions={pageSizeOptions}
                        checkboxSelection
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: CustomToolbar,
                        }}
                        sx={{
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: 'rgba(226, 246, 221, 0.4)',
                                // color: "red"
                            },
                        }}
                    />
                ) : (
                    <Tooltip title="Select csv file from file system">
                        <Button variant="text" component="label">
                            <FileUploadIcon />
                            Upload
                            <input
                                type="file"
                                onChange={handleCsvFile}
                                accept=".csv"
                                hidden
                            />
                        </Button>
                    </Tooltip>
                )}
            </Box>
        </div>
    );
}
