import { ReactElement } from "react";

function OwedDisplay({ amount }: { amount: number }): ReactElement {
    return <div>Current Amount Owed ${amount}</div>;
};

export default OwedDisplay;
