import { ChangeEvent, ReactElement } from 'react';
import Papa from 'papaparse';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button, Input, Tooltip } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React from 'react';

const columns: GridColDef[] = [
    {
        field: '0',
        headerName: 'Date',
        width: 150,
        editable: true,
    },
    {
        field: '1',
        headerName: 'Description',
        width: 150,
        editable: true,
    },
    {
        field: '2',
        headerName: 'Original Description',
        width: 110,
        editable: true,
    },
    {
        field: '3',
        headerName: 'Amount',
        width: 160,
        editable: true,
    },
    {
        field: '4',
        headerName: 'Transaction Type',
        width: 160,
        editable: true,
    },
    {
        field: '5',
        headerName: 'Category',
        width: 160,
        editable: true,
    },
    {
        field: '6',
        headerName: 'Account Name',
        width: 160,
        editable: true,
    },
];

const pageSizeOptions: number[] = [5, 10, 25, 50];

export function UploadCsv(): ReactElement {
    const [data, setData] = React.useState([]);

    const handleCsvFile = (e: ChangeEvent) => {
        const files = (e.target as HTMLInputElement).files;
        console.log(files);
        if (files) {
            const file = files[0];
            Papa.parse(file, {
                complete: function (results) {
                    console.log('data', results.data);
                    const res = results.data.map((item, index) => {
                        return { id: index, ...item };
                    });
                    console.log('res', res);
                    setData(res);
                    return results.data;
                },
            });
        }
    };

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
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
                        pageSizeOptions={pageSizeOptions}
                        checkboxSelection
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: CustomToolbar,
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
