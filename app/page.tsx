import LatestIssues from "./_components/dashboard/LatestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <h1>Welcome!</h1>
      <LatestIssues />
    </>
  );
}
