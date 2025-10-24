import { NextResponse } from 'next/server';

// Mock ticket data - in real app, this would come from database/blockchain
const mockTickets = [
    {
        id: "1",
        purchaseDate: "2024-01-15T10:30:00Z",
        ticketNumbers: ["A1B2C3", "D4E5F6", "G7H8I9"],
        amount: "0.003",
        status: "active",
        drawDate: "2024-01-16T00:00:00Z",
        isWinner: false,
        userAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    },
    {
        id: "2",
        purchaseDate: "2024-01-14T14:20:00Z",
        ticketNumbers: ["J1K2L3", "M4N5O6"],
        amount: "0.002",
        status: "completed",
        drawDate: "2024-01-15T00:00:00Z",
        isWinner: true,
        winnings: "0.5",
        userAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    },
    {
        id: "3",
        purchaseDate: "2024-01-13T09:15:00Z",
        ticketNumbers: ["P7Q8R9", "S1T2U3", "V4W5X6", "Y7Z8A9"],
        amount: "0.004",
        status: "completed",
        drawDate: "2024-01-14T00:00:00Z",
        isWinner: false,
        userAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');

    if (!userAddress) {
        return NextResponse.json(
            { error: "User address is required" },
            { status: 400 }
        );
    }

    // Filter tickets by user address
    const userTickets = mockTickets.filter(ticket => ticket.userAddress === userAddress);

    // TODO: In real app, fetch from database or smart contract
    // const tickets = await getUserTickets(userAddress);

    return NextResponse.json(userTickets);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // TODO: Implement smart contract interaction using oyl-sdk
        // const result = await executeWithBtcWrapUnwrap(/* contract call params */);

        // Mock response for storing ticket purchase
        const mockResponse = {
            success: true,
            tickets: [
                {
                    id: Date.now().toString(),
                    purchaseDate: new Date().toISOString(),
                    ticketNumbers: ["T1I2C3", "K4E5T6", "L7U8C9"], // Mock numbers
                    amount: body.amount || "0.001",
                    status: "active",
                    drawDate: "2024-01-16T00:00:00Z", // Next draw
                    isWinner: false,
                    userAddress: body.userAddress
                }
            ],
            message: "Tickets purchased and stored successfully!"
        };

        return NextResponse.json(mockResponse);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to store tickets" },
            { status: 500 }
        );
    }
}
