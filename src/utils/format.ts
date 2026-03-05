export function formatCurrency(amount: number): string {
    return `\u20B9${amount.toLocaleString('en-IN')}`;
}

export function generateOrderId(): string {
    return `ECO-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
}
