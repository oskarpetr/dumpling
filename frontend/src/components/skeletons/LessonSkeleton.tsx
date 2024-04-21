import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LessonSkeleton() {
  return (
    <Skeleton width={270} height={96} borderRadius={12} className="m-0 p-0" />
  );
}
