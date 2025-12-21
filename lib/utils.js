// lib/utils.js
export function formatDate(dateString) {
    // format date nicely
    // example: from this 👉 2025-05-20 to this 👉 May 20, 2025
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// Additional utility functions for date filtering
export function isSameDate(date1, date2) {
    const d1 = new Date(date1).toISOString().split("T")[0];
    const d2 = new Date(date2).toISOString().split("T")[0];
    return d1 === d2;
}

export function formatDateToString(date) {
    return date.toISOString().split("T")[0];
}

export function getTodayString() {
    return new Date().toISOString().split("T")[0];
}

export function getYesterdayString() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
}

export function isValidDateYYYYMMDD(str) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;

    const [y, m, d] = str.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));

    return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}
