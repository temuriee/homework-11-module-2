"use client";

import { useQuery } from "@tanstack/react-query";

async function getFact() {
  const res = await fetch("https://meowfacts.herokuapp.com/");
  if (!res.ok) throw new Error("Failed To Fetch Facts");
  return res.json();
}

const Home = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["test"],
    queryFn: getFact,
  });
  console.log(data);

  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <p className="border-4 border-amber-600 rounded-3xl p-4">
          {/* data.data?.[0] ? data.data[0] : "No Fact Received" */}
          {data.data?.[0] ?? "No Fact Received"}
        </p>
      )}
      <button
        onClick={() => refetch()}
        className="border-4 border-amber-600 rounded-3xl p-4"
      >
        Get Another Fact
      </button>
    </div>
  );
};
export default Home;
