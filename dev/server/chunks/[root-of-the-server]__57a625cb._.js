module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/tickets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// Mock ticket data - in real app, this would come from database/blockchain
const mockTickets = [
    {
        id: "1",
        purchaseDate: "2024-01-15T10:30:00Z",
        ticketNumbers: [
            "A1B2C3",
            "D4E5F6",
            "G7H8I9"
        ],
        amount: "0.003",
        status: "active",
        drawDate: "2024-01-16T00:00:00Z",
        isWinner: false,
        userAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    },
    {
        id: "2",
        purchaseDate: "2024-01-14T14:20:00Z",
        ticketNumbers: [
            "J1K2L3",
            "M4N5O6"
        ],
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
        ticketNumbers: [
            "P7Q8R9",
            "S1T2U3",
            "V4W5X6",
            "Y7Z8A9"
        ],
        amount: "0.004",
        status: "completed",
        drawDate: "2024-01-14T00:00:00Z",
        isWinner: false,
        userAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
    }
];
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userAddress = searchParams.get('userAddress');
    if (!userAddress) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "User address is required"
        }, {
            status: 400
        });
    }
    // Filter tickets by user address
    const userTickets = mockTickets.filter((ticket)=>ticket.userAddress === userAddress);
    // TODO: In real app, fetch from database or smart contract
    // const tickets = await getUserTickets(userAddress);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(userTickets);
}
async function POST(request) {
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
                    ticketNumbers: [
                        "T1I2C3",
                        "K4E5T6",
                        "L7U8C9"
                    ],
                    amount: body.amount || "0.001",
                    status: "active",
                    drawDate: "2024-01-16T00:00:00Z",
                    isWinner: false,
                    userAddress: body.userAddress
                }
            ],
            message: "Tickets purchased and stored successfully!"
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(mockResponse);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Failed to store tickets"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__57a625cb._.js.map