interface Category {
    id: number;
    name: string;
    imageUrl: string;
    publicId: string;
    createdAt: string;
    updatedAt: string;
    description: string | null;
    parentId: number | null;
} 