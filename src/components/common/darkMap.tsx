"use client";

import { useEffect } from "react";

const DarkMap = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src =
      "https://www.openstreetmap.org/export/embed.html?bbox=49.9042%2C40.4200%2C49.9242%2C40.4400&layer=carto-dark";
    iframe.width = "100%";
    iframe.height = "500";
    iframe.style.border = "0";

    const container = document.getElementById("map");
    if (container) {
      container.innerHTML = "";
      container.appendChild(iframe);
    }
  }, []);

  return <div id="map" className="w-full h-[400px] md:h-[500px]" />;
};

export default DarkMap;
