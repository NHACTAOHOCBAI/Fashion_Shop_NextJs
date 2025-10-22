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
    department: Department
    attributeCategories: AttributeCategory[]
}
interface AttributeCategory {
    id: number
    attribute: Attribute
    category: Category
    value: string
}
