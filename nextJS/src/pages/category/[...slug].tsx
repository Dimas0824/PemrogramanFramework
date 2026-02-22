import { useRouter } from "next/router";

const CategorySlugPage = () => {
  const { query } = useRouter();
  const slugList = Array.isArray(query.slug) ? query.slug : [];

  return (
    <main style={{ padding: "24px" }}>
      <h1>Category Catch-all Route</h1>
      <p>Parameter URL:</p>

      <ul>
        {slugList.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </main>
  );
};

export default CategorySlugPage;
