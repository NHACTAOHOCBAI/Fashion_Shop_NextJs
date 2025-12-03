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
const getHeaderData = async () => {
  return headerData;
};
export { getHeaderData };
