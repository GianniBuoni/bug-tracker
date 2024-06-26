interface Props {
  rawDate: string;
}

const IssueTimeStamp = ({ rawDate }: Props) => {
  const shownDate = new Date(rawDate).toDateString();
  const shownTime = new Date(rawDate).toLocaleTimeString();
  return (
    <p>
      {shownDate},&nbsp;&nbsp;{shownTime}
    </p>
  );
};

export default IssueTimeStamp;
