function convertAttributeCategories(
    data: AttributeCategory[]
): { attributeName: string; values: { id: number; value: string }[] }[] {
    const map = new Map<string, Map<string, { id: number; value: string }>>();

    data.forEach((item) => {
        const name = item.attribute.name;
        if (!map.has(name)) {
            map.set(name, new Map());
        }
        // Sử dụng value làm key để tránh trùng
        const valueMap = map.get(name)!;
        if (!valueMap.has(item.value)) {
            valueMap.set(item.value, { id: item.id, value: item.value });
        }
    });

    return Array.from(map.entries()).map(([attributeName, valueMap]) => ({
        attributeName,
        values: Array.from(valueMap.values()),
    }));
}
export default convertAttributeCategories;
