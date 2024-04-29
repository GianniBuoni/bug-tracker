import Pagination from "./_components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <h1>Welcome!</h1>
      <Pagination
        itemCount={100}
        currentPage={parseInt(searchParams.page)}
        pageSize={5}
      />
    </>
  );
}
