import { Grid } from '@mui/material';

function StructuredGrid(props: { children: any; spacing: number}) {
    return (
        <Grid container spacing={props.spacing}>
            {props.children.map((child: any, i: number) => {
                return (
                    <Grid item xs={12} md={6} key={`grid-${i}`}>
                        {child}
                    </Grid>
                );
            })}
        </Grid>
    );
}

export default StructuredGrid;