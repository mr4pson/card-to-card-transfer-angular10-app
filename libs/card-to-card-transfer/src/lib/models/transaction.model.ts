export interface Transaction {
    id: string;
    payer: {
        cardNumber: number;
        name: string;
        activeUntilMonth: number;
        activeUntilYear: number;
    },
    recipient: {
        cardNumber: number;
    },
    sum: number;
    dc: Date;
}