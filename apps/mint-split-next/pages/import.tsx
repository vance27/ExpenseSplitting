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
import { MintCsvSchema } from '../components/zod/csv-schema';
import ImportBar from '../components/import/import-bar';
import ImportGrid from '../components/import/import-grid';
const pageSizeOptions: number[] = [5, 10, 25, 50];

// TODO: export to the zod definition file because the columns represent the data schema
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

export default function Import(): ReactElement {
    const [data, setData] = React.useState<MintCsvSchema>([]);
    const [error, setError] = React.useState<string | undefined>(undefined);

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

    return (
        <div>
            <Box sx={{ height: '90vh', width: '100%' }}>
                {error ? <Alert severity="error">{error}</Alert> : null}
                {data.length ? (
                    <ImportGrid
                        data={data}
                        columns={columns}
                        pageSizeOptions={pageSizeOptions}
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