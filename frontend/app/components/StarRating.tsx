// Компонент для отображения звезд с прогрессом

interface StarRatingProps {
  progressPercentage: number;
  className?: string;
}

export function StarRating({ progressPercentage, className = "" }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <svg 
        className="w-4 h-4 text-yellow-500" 
        viewBox="0 0 24 24"
        fill={progressPercentage >= 75 ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <svg 
        className="w-4 h-4 text-yellow-500" 
        viewBox="0 0 24 24"
        fill={progressPercentage >= 85 ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      <svg 
        className="w-4 h-4 text-yellow-500" 
        viewBox="0 0 24 24"
        fill={progressPercentage >= 95 ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    </div>
  );
}


