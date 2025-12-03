const categoryFilters = {
  id: 1,
  brands: [
    {
      id: 1,
      name: "Gucci",
    },
    {
      id: 2,
      name: "Louis Vuitton",
    },
    {
      id: 3,
      name: "Adidas",
    },
    {
      id: 4,
      name: "Nike",
    },
    {
      id: 5,
      name: "Labubu",
    },
  ],
  attributes: [
    {
      id: 101,
      attribute: {
        id: 1,
        name: "Color",
        createdAt: "2025-11-20T08:00:00.000Z",
      },
      value: "Red",
    },
    {
      id: 102,
      attribute: {
        id: 1,
        name: "Color",
        createdAt: "2025-11-20T08:00:00.000Z",
      },
      value: "Blue",
    },

    {
      id: 201,
      attribute: {
        id: 2,
        name: "Size",
        createdAt: "2025-11-25T10:30:00.000Z",
      },
      value: "S",
    },
    {
      id: 202,
      attribute: {
        id: 2,
        name: "Size",
        createdAt: "2025-11-25T10:30:00.000Z",
      },
      value: "M",
    },
    {
      id: 301,
      attribute: {
        id: 3,
        name: "Material",
        createdAt: "2025-11-28T15:45:00.000Z",
      },
      value: "Cotton",
    },
    {
      id: 401,
      attribute: {
        id: 4,
        name: "Pattern",
        createdAt: "2025-10-01T12:00:00.000Z",
        updatedAt: "2025-11-01T00:00:00.000Z",
      },
      value: "Striped",
    },
  ],
};
const headerData = [
  {
    department: "Man",
    categories: [
      {
        id: 1,
        name: "T-Shirts",
      },
      {
        id: 2,
        name: "Shoes",
      },
    ],
  },
  {
    department: "Woman",
    categories: [
      {
        id: 3,
        name: "T-Shirts",
      },
      {
        id: 4,
        name: "Shoes",
      },
    ],
  },
  {
    department: "Kid",
    categories: [
      {
        id: 5,
        name: "T-Shirts",
      },
    ],
  },
];
//1
const getCategoryFilters = async () => {
  return categoryFilters;
};
//2
const getHeaderData = async () => {
  return headerData;
};
//3 - getProducts chứa thêm brandIds
// Sử dụng kiểu dữ liệu Product đã định nghĩa trước đó
// import { Product } from './product-types'; // Giả sử bạn đã đặt các interfaces trong file riêng

export const productDataWithoutQuotes = {
  id: 2,
  name: "Easy Care Formal Shirt",
  description: "Wrinkle-resistant shirt ideal for office and formal occasions.",
  price: "39.50",
  averageRating: "0.0",
  reviewCount: 0,
  createdAt: "2025-11-05T00:34:35.716Z",
  updatedAt: "2025-11-05T00:34:35.716Z",
  category: {
    id: 1,
    name: "Men Shirts",
    slug: "men-shirts",
    description: "Formal and casual shirts for every occasion.",
    imageUrl:
      "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760278541/men-shoes_tbn1bl.png",
    publicId: "cat_men_shirts",
    createdAt: "2025-11-05T00:34:35.716Z",
    updatedAt: "2025-11-05T00:34:35.716Z",
    isActive: true,
  },
  brand: {
    id: 3,
    name: "Uniqlo",
    slug: "uniqlo",
    description:
      "Uniqlo — a Japanese casual wear brand offering minimalist designs and advanced fabric technology.",
    imageUrl:
      "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760276180/uniqlo_yqjg6m.svg",
    publicId: "brand_uniqlo",
    createdAt: "2025-11-05T00:34:35.716Z",
    updatedAt: "2025-11-05T00:34:35.716Z",
    isActive: true,
  },
  variants: [
    {
      id: 49,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "variant_men_shirts_easy_care_formal_shirt_s_white_regular",
      quantity: 50,
      remaining: 50,
      isActive: true,
      createdAt: "2025-11-05T00:34:35.716Z",
      updatedAt: "2025-11-05T00:34:35.716Z",
      variantAttributeValues: [
        {
          id: 145,
          attributeCategory: {
            id: 1,
            attribute: {
              id: 1,
              name: "Size",
              isActive: true,
            },
            value: "S",
            isActive: true,
          },
        },
        {
          id: 146,
          attributeCategory: {
            id: 5,
            attribute: {
              id: 2,
              name: "Color",
              isActive: true,
            },
            value: "White",
            isActive: true,
          },
        },
        {
          id: 147,
          attributeCategory: {
            id: 9,
            attribute: {
              id: 5,
              name: "Fit",
              isActive: true,
            },
            value: "Regular",
            isActive: true,
          },
        },
      ],
    },
    {
      id: 50,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "variant_men_shirts_easy_care_formal_shirt_s_white_slim",
      quantity: 50,
      remaining: 50,
      isActive: true,
      createdAt: "2025-11-05T00:34:35.716Z",
      updatedAt: "2025-11-05T00:34:35.716Z",
      variantAttributeValues: [
        {
          id: 148,
          attributeCategory: {
            id: 1,
            attribute: {
              id: 1,
              name: "Size",
              isActive: true,
            },
            value: "S",
            isActive: true,
          },
        },
        {
          id: 149,
          attributeCategory: {
            id: 5,
            attribute: {
              id: 2,
              name: "Color",
              isActive: true,
            },
            value: "White",
            isActive: true,
          },
        },
        {
          id: 150,
          attributeCategory: {
            id: 10,
            attribute: {
              id: 5,
              name: "Fit",
              isActive: true,
            },
            value: "Slim",
            isActive: true,
          },
        },
      ],
    },
    {
      id: 51,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "variant_men_shirts_easy_care_formal_shirt_s_white_loose",
      quantity: 50,
      remaining: 50,
      isActive: true,
      createdAt: "2025-11-05T00:34:35.716Z",
      updatedAt: "2025-11-05T00:34:35.716Z",
      variantAttributeValues: [
        {
          id: 151,
          attributeCategory: {
            id: 1,
            attribute: {
              id: 1,
              name: "Size",
              isActive: true,
            },
            value: "S",
            isActive: true,
          },
        },
        {
          id: 152,
          attributeCategory: {
            id: 5,
            attribute: {
              id: 2,
              name: "Color",
              isActive: true,
            },
            value: "White",
            isActive: true,
          },
        },
        {
          id: 153,
          attributeCategory: {
            id: 11,
            attribute: {
              id: 5,
              name: "Fit",
              isActive: true,
            },
            value: "Loose",
            isActive: true,
          },
        },
      ],
    },
    {
      id: 52,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "variant_men_shirts_easy_care_formal_shirt_s_blue_regular",
      quantity: 50,
      remaining: 50,
      isActive: true,
      createdAt: "2025-11-05T00:34:35.716Z",
      updatedAt: "2025-11-05T00:34:35.716Z",
      variantAttributeValues: [
        {
          id: 154,
          attributeCategory: {
            id: 1,
            attribute: {
              id: 1,
              name: "Size",
              isActive: true,
            },
            value: "S",
            isActive: true,
          },
        },
        {
          id: 155,
          attributeCategory: {
            id: 6,
            attribute: {
              id: 2,
              name: "Color",
              isActive: true,
            },
            value: "Blue",
            isActive: true,
          },
        },
        {
          id: 156,
          attributeCategory: {
            id: 9,
            attribute: {
              id: 5,
              name: "Fit",
              isActive: true,
            },
            value: "Regular",
            isActive: true,
          },
        },
      ],
    },
    {
      id: 53,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "variant_men_shirts_easy_care_formal_shirt_s_blue_slim",
      quantity: 50,
      remaining: 50,
      isActive: true,
      createdAt: "2025-11-05T00:34:35.716Z",
      updatedAt: "2025-11-05T00:34:35.716Z",
      variantAttributeValues: [
        {
          id: 157,
          attributeCategory: {
            id: 1,
            attribute: {
              id: 1,
              name: "Size",
              isActive: true,
            },
            value: "S",
            isActive: true,
          },
        },
        {
          id: 158,
          attributeCategory: {
            id: 6,
            attribute: {
              id: 2,
              name: "Color",
              isActive: true,
            },
            value: "Blue",
            isActive: true,
          },
        },
        {
          id: 159,
          attributeCategory: {
            id: 10,
            attribute: {
              id: 5,
              name: "Fit",
              isActive: true,
            },
            value: "Slim",
            isActive: true,
          },
        },
      ],
    },
    {
      id: 54,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "variant_men_shirts_easy_care_formal_shirt_s_blue_loose",
      quantity: 50,
      remaining: 50,
      isActive: true,
      createdAt: "2025-11-05T00:34:35.716Z",
      updatedAt: "2025-11-05T00:34:35.716Z",
      variantAttributeValues: [
        {
          id: 160,
          attributeCategory: {
            id: 1,
            attribute: {
              id: 1,
              name: "Size",
              isActive: true,
            },
            value: "S",
            isActive: true,
          },
        },
        {
          id: 161,
          attributeCategory: {
            id: 6,
            attribute: {
              id: 2,
              name: "Color",
              isActive: true,
            },
            value: "Blue",
            isActive: true,
          },
        },
        {
          id: 162,
          attributeCategory: {
            id: 11,
            attribute: {
              id: 5,
              name: "Fit",
              isActive: true,
            },
            value: "Loose",
            isActive: true,
          },
        },
      ],
    },
    {
      id: 55,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "variant_men_shirts_easy_care_formal_shirt_s_black_regular",
      quantity: 50,
      remaining: 50,
      isActive: true,
      createdAt: "2025-11-05T00:34:35.716Z",
      updatedAt: "2025-11-05T00:34:35.716Z",
      variantAttributeValues: [
        {
          id: 163,
          attributeCategory: {
            id: 1,
            attribute: {
              id: 1,
              name: "Size",
              isActive: true,
            },
            value: "S",
            isActive: true,
          },
        },
        {
          id: 164,
          attributeCategory: {
            id: 7,
            attribute: {
              id: 2,
              name: "Color",
              isActive: true,
            },
            value: "Black",
            isActive: true,
          },
        },
        {
          id: 165,
          attributeCategory: {
            id: 9,
            attribute: {
              id: 5,
              name: "Fit",
              isActive: true,
            },
            value: "Regular",
            isActive: true,
          },
        },
      ],
    },
  ],
  images: [
    {
      id: 4,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362185/men_shirt_formal_1_bljjdn.png",
      publicId: "men_shirt_formal_1",
      isActive: true,
    },
    {
      id: 5,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362186/men_shirt_formal_2_py7h91.png",
      publicId: "men_shirt_formal_2",
      isActive: true,
    },
    {
      id: 6,
      imageUrl:
        "https://res.cloudinary.com/dtkbbwmg4/image/upload/v1760362188/men_shirt_formal_3_yqcw2i.png",
      publicId: "men_shirt_formal_3",
      isActive: true,
    },
  ],
  isActive: true,
};
