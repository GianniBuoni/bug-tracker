import { Metadata } from "next";
import IssueSummary from "./_components/dashboard/IssueSummary";
import IssueSummaryChart from "./_components/dashboard/IssueSummaryChart";
import LatestIssues from "./_components/dashboard/LatestIssues";
import { pb } from "./_services/pb";

const Home = async () => {
  const open = await pb.collection("issue").getFullList({
    filter: "status='OPEN'",
    cache: "no-cache",
  });

  const closed = await pb.collection("issue").getFullList({
    filter: "status='CLOSED'",
    cache: "no-cache",
  });

  const inProgress = await pb.collection("issue").getFullList({
    filter: "status='IN_PROGRESS'",
    cache: "no-cache",
  });

  return (
    <>
      <h1>Welcome!</h1>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col space-y-3">
          <IssueSummary
            open={open.length}
            closed={closed.length}
            inProgress={inProgress.length}
          />
          <IssueSummaryChart
            open={open.length}
            closed={closed.length}
            inProgress={inProgress.length}
          />
        </div>
        <LatestIssues />
      </div>
    </>
  );
};

export default Home;
export const metadata: Metadata = {
  title: "Issue Tracker | Dashboard",
  description: "View a summary of project issues.",
};
