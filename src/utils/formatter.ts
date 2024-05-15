export const formatDateToYYMM = (date: Date) => {
    const year: string = date.getFullYear().toString().slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    return `${year}-${month}`;
}
