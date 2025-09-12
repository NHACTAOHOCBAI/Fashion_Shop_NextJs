interface Category {
    id: number;
    name: string;
    imageUrl: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    parentId?: number
} 