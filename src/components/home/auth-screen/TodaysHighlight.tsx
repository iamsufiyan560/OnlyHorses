"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
const TodaysHighlight = () => {
  return (
    <div className="w-full md:w-3/4 mx-auto">
      <CldVideoPlayer
        width="960"
        height="540"
        className="rounded-md"
        src="laiivslv3yvx6qq5xuyn"
      />
    </div>
  );
};
export default TodaysHighlight;
