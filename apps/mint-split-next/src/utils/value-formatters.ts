import { GridValueFormatterParams } from "@mui/x-data-grid";

export const CurrencyDisplayFormatter = (value: string): string => {
    return `$${value.substring(0, value.length - 2)}.${value.substring(-2)}`;
};
