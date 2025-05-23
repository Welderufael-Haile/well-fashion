import Link from "next/link";

const categories = [
  { name: "All", path: "/catagory/all" },
  { name: "Men's Clothes", path: "/catagory/men" },
  { name: "Women's Clothes", path: "/catagory/women" },
  { name: "Men's Shoes", path: "/catagory/shoes" },
  { name: "jewelery", path: "/catagory/jewelery" },
  { name: "Children's Clothes", path: "/catagory/children" },
];

function CategoryList() {
  return (
    <div className="dark:bg-gray-800 overflow-x-auto whitespace-nowrap mt-5 pt-24 p-4">
      {categories.map((cat, index) => (
        <Link key={index} href={cat.path} className="px-4 py-2 bg-gray-50 mx-2 rounded-lg shadow">
          {cat.name}
        </Link>
      ))}
    </div>
  );
}

export default CategoryList;
