export const ucWords = (string: string): string => {
    return String(string).toLowerCase()
        .replace(/\b[a-z]/g, (l) => l.toUpperCase())
}