import { parseISO, formatDistanceToNowStrict } from "date-fns";

export const TimeAgo = ({ post }) => {
  const calculateTimeAgo = () => {
    const date = parseISO(post.createdAt);
    const timePeriod = formatDistanceToNowStrict(date);
    const timeWithShortUnit = timePeriod.replace(
      /\w+$/,
      (unit) =>
        ({
          minute: "m",
          minutes: "m",
          hour: "h",
          hours: "h",
          second: "s",
          seconds: "s",
          day: "d",
          days: "d",
          year: "y",
          years: "y",
          weeks: "w",
          week: "w",
        }[unit])
    );
    const timeWithoutSpace = timeWithShortUnit.replace(/\s+/g, "");
    return timeWithoutSpace;
  };

  return <div className="font-size-6 text-gray">{calculateTimeAgo()}</div>;
};
