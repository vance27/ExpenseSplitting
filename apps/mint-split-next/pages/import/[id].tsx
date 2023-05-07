import { ChangeEvent, ReactElement } from 'react';
import Papa from 'papaparse';
import { GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Alert, Button, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React from 'react';
import {
    MintCsvSchema,
    TransactionBulkColumns,
    TransactionBulkSchema,
    TransactionSchema,
} from '../../components/zod/transactions';
import ImportGrid from '../../components/import/mint-split-grid';
import ImportBar from 'apps/mint-split-next/components/import/import-bar';
import { AddCard, PlusOne, PostAdd } from '@mui/icons-material';
import {
    MintCsvTranslation,
    ParseMintCsv,
} from 'apps/mint-split-next/services/mint-csv-translation';
import { ZodError } from 'zod';
import { getSession, useSession } from 'next-auth/react';

// TODO: Add loading spinner for data grid
// TODO: color code values to easily see large transactions
// TODO: add delete row capability
// TODO: add saved state cookie/local storage (in progress)

// TODO: ONLY display data in the way that it will be imported into the database, instead of the way mint shows it

/**
 *  Import page
 * - Upload csv file (mint csv, translates data into MintSplitFormat) OR manually add transactions
 * - Display csv file in data grid (editable columns)
 * - Allow user to create shared transactions (shared percentages, based on authorized users)
 * - Allow user to import data into database
 *
 */
export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    return {
        props: {
            session: session,
        },
    };
};

export default function Import({ session }: { session: any }): ReactElement {
    const [data, setData] = React.useState<TransactionBulkSchema>([]);
    const [error, setError] = React.useState<string | undefined>(undefined);

    const handleCsvFile = async (e: ChangeEvent): Promise<any> => {
        const files = (e.target as HTMLInputElement).files;
        if (!files) {
            setError('No file selected');
            return;
        }
        try {
            const res = await fetch('/api/import/mint-csv', {
                method: 'POST',
                body: files[0],
            });
            if (!res.ok) {
                throw new Error('Error occured importing file');
            }
            const json = await res.json();
            setData(json);
            setError(undefined);
        } catch (e) {
            console.error(e);
            setError('Error occured');
        }
    };

    return (
        <div>
            <Box sx={{ maxHeight: '90vh', width: '100%' }}>
                {error ? <Alert severity="error">{error}</Alert> : null}
                {data.length ? (
                    <ImportGrid
                        data={data}
                        columns={TransactionBulkColumns}
                        setData={setData}
                        toolbar={() => <ImportBar setData={setData} />}
                    />
                ) : (
                    <>
                        <Tooltip title="Select csv file from file system">
                            <Button variant="text" component="label">
                                <FileUploadIcon />
                                Upload File
                                <input
                                    type="file"
                                    onChange={handleCsvFile}
                                    accept=".csv"
                                    hidden
                                />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Allows a user to manually add transactions in a table format">
                            <Button variant="text" component="label">
                                <PostAdd />
                                Manually Add Transactions
                            </Button>
                        </Tooltip>
                    </>
                )}
            </Box>
        </div>
    );
}
