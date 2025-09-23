function convertAttributeCategories(
    data: AttributeCategory[]
): { attributeName: string; values: { id: number; value: string }[] }[] {
    const map = new Map<string, { id: number; value: string }[]>();

    data.forEach((item) => {
        const name = item.attribute.name;
        if (!map.has(name)) {
            map.set(name, []);
        }
        map.get(name)!.push({ id: item.id, value: item.value });
    });

    return Array.from(map.entries()).map(([attributeName, values]) => ({
        attributeName,
        values,
    }));
}
export default convertAttributeCategories