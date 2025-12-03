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
