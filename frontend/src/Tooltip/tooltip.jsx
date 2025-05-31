import { useRef, useEffect, useState } from "react";
import styles from "./tooltip.module.css";
const TruncateTooltip = ({ color = "text-gray-500", text, width = 300 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setShowTooltip(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  return (
    <div className="relative group" style={{ maxWidth: "100%", width }}>
      <p
        ref={textRef}
        className={`${styles.text} text-sm ${color} transition-all`}
      >
        {text}
      </p>

      {showTooltip && (
        <div className="absolute inset-x-0 sm:group-hover:block hidden bg-black text-white text-xs p-2 rounded z-10 mt-1 max-w-[90vw] overflow-x-hidden">
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncateTooltip;
