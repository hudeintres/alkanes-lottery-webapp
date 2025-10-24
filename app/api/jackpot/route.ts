import { NextResponse } from 'next/server';

// Mock jackpot data - in real app, this would come from smart contracts
export async function GET() {
    const jackpotData = {
        currentAmount: "25.5", // BTC
        totalTicketsSold: 25500,
        timeUntilNextDraw: "2:45:30", // HH:MM:SS
        nextDrawBlock: 874123,
        lastWinner: {
            address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", // Mock address
            amount: "18.7",
            date: "2024-01-15T00:00:00Z"
        },
        recentDraws: [
            {
                block: 873979,
                winner: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
                amount: "18.7",
                date: "2024-01-15T00:00:00Z"
            },
            {
                block: 873835,
                winner: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
                amount: "12.3",
                date: "2024-01-14T00:00:00Z"
            }
        ]
    };

    return NextResponse.json(jackpotData);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // TODO: Implement smart contract interaction using oyl-sdk
        // const result = await executeWithBtcWrapUnwrap(/* contract call params */);

        // Mock response for ticket purchase
        const mockResponse = {
            success: true,
            transactionId: "mock-tx-" + Date.now(),
            ticketNumbers: ["A1B2C3", "D4E5F6", "G7H8I9"],
            message: "Tickets purchased successfully!"
        };

        return NextResponse.json(mockResponse);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to purchase tickets" },
            { status: 500 }
        );
    }
}
