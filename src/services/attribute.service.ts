/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios"

const getAttributes = async (params: QueryParams) => {
    const response = await axiosInstance.get('/attributes', { params }) as GetAllResponse<Attribute>
    return response.data
}
const getAttributeSelection = async () => {
    const response = await axiosInstance.get('/attributes') as GetAllResponse<Attribute>
    return response.data.data
}
const deleteAttribute = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/attributes/${id}`)
    return response
}
const deleteAttributes = async (ids: { ids: number[] }) => {
    const response = await axiosInstance.post('/attributes/remove-multiple', ids)
    return response
}
const createAttribute = async (data: {
    name: string,
}) => {
    const response = await axiosInstance.post('/attributes', data)
    return response
};

const updateAttribute = async ({ id, data }: { id: number, data: { name: string } }) => {
    const response = await axiosInstance.put(`/attributes/${id}`, data)
    return response
}
// mock/category.ts
const mockCategory: Category = {
    id: 1,
    slug: "electronics",
    name: "Electronics",
    imageUrl: "https://example.com/images/electronics.jpg",
    publicId: "public-123",
    createdAt: "2025-09-23T12:00:00Z",
    updatedAt: "2025-09-23T12:00:00Z",
    isActive: true,
    description: "Electronic devices and gadgets",
    department: {
        id: 1,
        name: "Technology",
        isActive: true,
    },
    attributeCategories: [
        {
            id: 101,
            value: "Black",
            attribute: {
                id: 201,
                name: "Color",
                isActive: true,
            },
            category: {} as any, // Tránh vòng lặp (nếu cần có thể null)
        },
        {
            id: 102,
            value: "Green",
            attribute: {
                id: 201,
                name: "Color",
                isActive: true,
            },
            category: {} as any, // Tránh vòng lặp (nếu cần có thể null)
        },
        {
            id: 103,
            value: "L",
            attribute: {
                id: 201,
                name: "Size",
                isActive: true,
            },
            category: {} as any, // Tránh vòng lặp (nếu cần có thể null)
        },
        {
            id: 104,
            value: "M",
            attribute: {
                id: 201,
                name: "Size",
                isActive: true,
            },
            category: {} as any, // Tránh vòng lặp (nếu cần có thể null)
        },
    ],
};

export const getAttributeCategoryByCategory = async (id: number) => {
    console.log('get with id ', id)
    // Giả lập delay như gọi API thật
    return new Promise<AttributeCategory[]>((resolve) => {
        setTimeout(() => {
            resolve(mockCategory.attributeCategories);
        }, 500);
    });
};
export { createAttribute, deleteAttribute, deleteAttributes, getAttributes, updateAttribute, getAttributeSelection }