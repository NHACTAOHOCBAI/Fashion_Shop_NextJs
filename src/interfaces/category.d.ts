interface Category {
    id: number;
    slug: string
    name: string;
    imageUrl: string;
    publicId: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean
    description?: string;
    departmentId: number
}