interface Department {
    id: number
    name: string
    slug: string
    description: string
    imageUrl: string
    isActive: boolean
    createdAt: string;
    updatedAt: string;
    categories: Category[]
}