const Star = ({ fill }: { fill: 0 | 0.5 | 1 }) => {
  if (fill === 1) return <span className="text-yellow-400">★</span>;
  if (fill === 0) return <span className="text-gray-300">★</span>;

  // half star
  return (
    <span className="relative inline-block">
      <span className="text-gray-300">★</span>
      <span
        className="absolute left-0 top-0 overflow-hidden text-yellow-400"
        style={{ width: "50%" }}
      >
        ★
      </span>
    </span>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  const clamped = rating;
  console.log("clamped", clamped);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const remaining = clamped - i;
        const fill: 0 | 0.5 | 1 =
          remaining >= 1 ? 1 : remaining >= 0.5 ? 0.5 : 0;

        return <Star key={i} fill={fill} />;
      })}

      <span className="ml-1 text-sm text-gray-600">({clamped.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;
