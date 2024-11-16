
export const BackgroundPattern: React.FC = () => {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#FFD700" fillOpacity="0.2" />
            </pattern>
            <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {[...Array(10)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="0%"
              y1={`${10 * i}%`}
              x2="100%"
              y2={`${10 * i}%`}
              stroke="#FFD700"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={`${10 * i}%`}
              y1="0%"
              x2={`${10 * i}%`}
              y2="100%"
              stroke="#FFD700"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
          ))}
          <rect width="100%" height="100%" fill="url(#fade)" />
        </svg>
      </div>
    )
}
  