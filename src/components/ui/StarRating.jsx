import { Star } from 'lucide-react'

const StarRating = ({ value = 0, count = 0, size = 12 }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={size}
            className={star <= Math.round(value) ? 'text-yellow-400' : 'text-gray-200'}
            fill={star <= Math.round(value) ? '#FBBF24' : '#E5E7EB'}
            strokeWidth={0}
          />
        ))}
      </div>
      {count > 0 && (
        <span className="text-[10px] text-gray-400">({count})</span>
      )}
    </div>
  )
}

export default StarRating
