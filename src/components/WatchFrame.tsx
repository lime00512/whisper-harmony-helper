
import React from "react";
import { cn } from "@/lib/utils";

interface WatchFrameProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const WatchFrame: React.FC<WatchFrameProps> = ({
  children,
  className,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-[120px]",
    md: "w-[180px]",
    lg: "w-[240px]",
  };

  return (
    <div className={cn("relative mx-auto", sizeClasses[size], className)}>
      <div className="watch-frame">
        <div className="watch-button"></div>
        <div className="watch-screen">
          <div className="watch-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default WatchFrame;
