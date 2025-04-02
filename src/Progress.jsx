import { useState } from "react";
function Progress() {
  const [progress, setProgress] = useState(30); // Initial progress (30%)

  return (
    <div className="w-64 h-6 border border-gray-400 rounded overflow-hidden">
      <div
        className="h-full bg-green-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}


export default Progress;