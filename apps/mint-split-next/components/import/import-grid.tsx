import { DataGrid } from '@mui/x-data-grid';
import ImportBar from './import-bar';

const pageSizeOptions: number[] = [5, 10, 25, 50];


function ImportGrid({
    data,
    columns,
    setData,
    toolbar
}: {
    data: any;
    columns: any;
    setData: () => any;
    toolbar: () => any;
}) {
    return (
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
            getRowClassName={(params: any) =>
                params.indexRelativeToCurrentPage % 2 === 0
                    ? 'Mui-even'
                    : 'Mui-odd'
            }
            pageSizeOptions={pageSizeOptions}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{
                toolbar: toolbar,
            }}
            sx={{
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'rgba(226, 246, 221, 0.4)',
                    // color: "red"
                },
            }}
        />
    );
}

export default ImportGrid;
