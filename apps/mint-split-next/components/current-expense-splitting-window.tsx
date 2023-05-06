import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import ImportGrid from './import/import-grid';

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: false,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 150,
        editable: true,
    },
    {
        field: 'sharedId',
        headerName: 'Shared',
        width: 150,
        editable: true,
        valueFormatter: ({ value }) => (value ? 'Yes' : 'No'),
    },
];

function CurrentExpenseSplittingWindow({
    transactions,
}: {
    transactions: any[];
}): ReactElement {
    console.log('transactions in expense splitting window', transactions);
    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
            <Box sx={{ maxHeight: '90vh', width: '100%' }}>
                <ImportGrid
                    data={transactions}
                    columns={columns}
                    setData={() => {}}
                    toolbar={() => {}}
                ></ImportGrid>
            </Box>
        </div>
    );
}

export default CurrentExpenseSplittingWindow;
