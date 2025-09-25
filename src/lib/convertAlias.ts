const convertAlias = (fullName: string): string => {
    if (!fullName) return "";
    const parts = fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (parts.length === 0) return "";
    const lastTwo = parts.slice(-2);
    const alias = lastTwo.map(word => word[0].toUpperCase()).join("");

    return alias;
};

export default convertAlias