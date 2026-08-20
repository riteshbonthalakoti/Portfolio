import React from "react";

import { cn } from "@/lib/utils";

export function GridBackground({
  children,
  height = "min-h-screen",
}: {
  children: React.ReactNode;
  height?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center bg-white dark:bg-black",
        height,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-75",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/3 w-[400px] h-[250px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[100px] rounded-full" />
      {children}
    </div>
  );
}
