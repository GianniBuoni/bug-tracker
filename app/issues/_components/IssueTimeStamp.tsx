interface Props {
  rawDate: string;
}

const IssueTimeStamp = ({ rawDate }: Props) => {
  const shownDate = new Date(rawDate).toDateString();
  const shownTime = new Date(rawDate).toLocaleTimeString();
  return (
    <span>
      {shownDate},&nbsp;&nbsp;{shownTime}
    </span>
  );
};

export default IssueTimeStamp;
