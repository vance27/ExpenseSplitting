import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import MintSplitGrid from './import/mint-split-grid';

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
    return (
        <div>
            Current Expense Splitting Window
            <div>Transactions Display</div>
            <Box sx={{ maxHeight: '90vh', width: '100%' }}>
                <MintSplitGrid
                    data={transactions}
                    columns={columns}
                    setData={() => {}}
                    toolbar={() => {}}
                ></MintSplitGrid>
            </Box>
        </div>
    );
}

export default CurrentExpenseSplittingWindow;
