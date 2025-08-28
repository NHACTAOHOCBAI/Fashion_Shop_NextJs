const urlToName = (url: string): string => {
    const tmp = url.split("-");
    const name = tmp.reduce((total, value) => {
        if (!value) return total;
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1) + " ";
        return total + capitalized;
    }, "");
    return name;
};

export default urlToName;
