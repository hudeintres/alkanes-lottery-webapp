"use client";

import { useState, useEffect } from "react";
import ClientNavbar from "@/components/ClientNavbar";
import { useClientWallet } from "@/hooks/useClientWallet";

// Mock ticket data - in real app, this would come from API
const mockTickets = [
    {
        id: "1",
        purchaseDate: "2024-01-15T10:30:00Z",
        ticketNumbers: ["A1B2C3", "D4E5F6", "G7H8I9"],
        amount: "0.003",
        status: "active",
        drawDate: "2024-01-16T00:00:00Z",
        isWinner: false,
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
    },
    {
        id: "3",
        purchaseDate: "2024-01-13T09:15:00Z",
        ticketNumbers: ["P7Q8R9", "S1T2U3", "V4W5X6", "Y7Z8A9"],
        amount: "0.004",
        status: "completed",
        drawDate: "2024-01-14T00:00:00Z",
        isWinner: false,
    },
];

export default function TicketsPage() {
    const { isConnected, address } = useClientWallet();
    const [tickets, setTickets] = useState(mockTickets);
    const [filter, setFilter] = useState("all"); // all, active, completed, winners
    const [loading, setLoading] = useState(false);

    const filteredTickets = tickets.filter((ticket) => {
        switch (filter) {
            case "active":
                return ticket.status === "active";
            case "completed":
                return ticket.status === "completed";
            case "winners":
                return ticket.isWinner;
            default:
                return true;
        }
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusColor = (status: string, isWinner: boolean) => {
        if (isWinner) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
        if (status === "active") return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    };

    const getStatusText = (status: string, isWinner: boolean) => {
        if (isWinner) return "Winner!";
        if (status === "active") return "Active";
        return "Completed";
    };

    const totalSpent = tickets.reduce((sum, ticket) => sum + parseFloat(ticket.amount), 0);
    const totalWinnings = tickets
        .filter((ticket) => ticket.isWinner)
        .reduce((sum, ticket) => sum + parseFloat(ticket.winnings || "0"), 0);

    // Fetch tickets when wallet is connected
    useEffect(() => {
        const fetchTickets = async () => {
            if (!isConnected || !address) {
                setTickets(mockTickets); // Show mock data when not connected
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`/api/tickets?userAddress=${address}`);
                const userTickets = await response.json();
                setTickets(userTickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setTickets([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [isConnected, address]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ClientNavbar />

            <main className="pt-16">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            My Lottery Tickets
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Track your ticket history and winnings
                        </p>
                    </div>

                    {!isConnected && (
                        <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-2xl mx-auto">
                            <p className="text-yellow-800 dark:text-yellow-200 text-center">
                                🔗 Please connect your wallet to view your tickets
                            </p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                Total Tickets
                            </h3>
                            <p className="text-3xl font-bold text-blue-500">{tickets.length}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                Total Spent
                            </h3>
                            <p className="text-3xl font-bold text-orange-500">{totalSpent.toFixed(3)} BTC</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                Total Winnings
                            </h3>
                            <p className="text-3xl font-bold text-green-500">{totalWinnings.toFixed(3)} BTC</p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-center mb-8">
                        <div className="flex space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-lg">
                            {["all", "active", "completed", "winners"].map((filterOption) => (
                                <button
                                    key={filterOption}
                                    onClick={() => setFilter(filterOption)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === filterOption
                                            ? "bg-orange-500 text-white"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tickets List */}
                    <div className="max-w-6xl mx-auto">
                        {loading ? (
                            <div className="text-center py-16">
                                <div className="text-4xl mb-4">⏳</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Loading tickets...
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Please wait while we fetch your ticket history.
                                </p>
                            </div>
                        ) : filteredTickets.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🎫</div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    No tickets found
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {filter === "all"
                                        ? (isConnected ? "You haven't purchased any tickets yet." : "Please connect your wallet to view your tickets.")
                                        : `No ${filter} tickets found.`}
                                </p>
                                {isConnected && (
                                    <a
                                        href="/jackpot"
                                        className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                                    >
                                        Buy Your First Ticket
                                    </a>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                    Ticket #{ticket.id}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(ticket.purchaseDate)}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    ticket.status,
                                                    ticket.isWinner
                                                )}`}
                                            >
                                                {getStatusText(ticket.status, ticket.isWinner)}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Numbers:
                                            </h4>
                                            <div className="flex flex-wrap gap-1">
                                                {ticket.ticketNumbers.map((number, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs font-mono"
                                                    >
                                                        {number}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <div>
                                                <span className="text-gray-500 dark:text-gray-400">Cost: </span>
                                                <span className="font-semibold text-orange-500">
                                                    {ticket.amount} BTC
                                                </span>
                                            </div>
                                            {ticket.isWinner && (
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Won: </span>
                                                    <span className="font-semibold text-green-500">
                                                        {ticket.winnings} BTC
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                                <span>Draw: {formatDate(ticket.drawDate)}</span>
                                                <span>{ticket.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
