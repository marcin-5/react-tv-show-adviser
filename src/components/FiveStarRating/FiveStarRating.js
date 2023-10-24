import { Star as StarEmpty, StarHalf, StarFill } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  const starFillCount = parseInt(rating);
  const hasHalfStar = rating - starFillCount >= 0.5;
  const starEmptyCount = 5 - starFillCount - ((hasHalfStar && 1) || 0);
  return (
    <div>
      {Array.from({ length: starFillCount }, (_, i) => (
        <StarFill key={"star-fill" + i} />
      ))}
      {hasHalfStar ? <StarHalf key="star-half" /> : ""}
      {Array.from({ length: starEmptyCount }, () => (
        <StarEmpty key={"q"} />
      ))}
    </div>
  );
}
