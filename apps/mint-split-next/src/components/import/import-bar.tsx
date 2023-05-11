import { Button } from '@mui/material';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import UndoIcon from '@mui/icons-material/Undo';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ReactElement } from 'react';

function ImportBar({
    setData,
}: {
    setData: (event: any) => void;
}): ReactElement {
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
            <Button variant="text" onClick={setData.bind([])}>
                <UndoIcon />
                Reset
            </Button>
            <Button variant="text">
                <FileUploadIcon />
                Import CSV
            </Button>
        </GridToolbarContainer>
    );
}

export default ImportBar;
