import { DataGrid } from '@mui/x-data-grid';
import ImportBar from './import-bar';

function ImportGrid({
    data,
    columns,
    pageSizeOptions,
}: {
    data: any;
    columns: any;
    pageSizeOptions: any;
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
                toolbar: ImportBar,
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
