export default function BlueBlob({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 1592 2422"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientTransform="matrix(1.01 .04 .04 -1 2352.44 22444.75)"
          gradientUnits="userSpaceOnUse"
          id="SVG-Blob2-c"
          x1="-2522.59"
          x2="-1586.36"
          y1="21044.32"
          y2="21044.32"
        >
          <stop offset="0" stopColor="#0089a4" />
          <stop offset=".41" stopColor="#00adee" />
          <stop offset="1" stopColor="#84cba8" />
        </linearGradient>
        <linearGradient
          gradientTransform="matrix(1 .04 .04 -1 2334.68 22444.12)"
          gradientUnits="userSpaceOnUse"
          id="SVG-Blob2-d"
          x1="-2397.9"
          x2="-1662.73"
          y1="21015.86"
          y2="21015.86"
        >
          <stop offset="0" stopColor="#2251a9" />
          <stop offset=".85" stopColor="#00adee" />
        </linearGradient>
      </defs>
      <path
        d="M1447.37 1574.18c126.65-168.11 39-370.64-184.84-470.4-128-57-990.73-964.71-572.1 592.07 56.57 210.32 429.24 313.3 756.94-121.67z"
        fill="url(#SVG-Blob2-c)"
      />
      <path
        d="M1422 1387.77c14.93-179-167.09-171.76-232.24-190.76-140.86-41.08-148.54-274.51-267.42-266.71-260.72 17.08-245.53 372.18-215.95 535.44 46 254 156.18 288.71 193.3 311.33 136.79 83.4 493.46-43.69 522.31-389.3z"
        fill="url(#SVG-Blob2-d)"
      />
    </svg>
  );
}
