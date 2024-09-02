import { Heart, Image as ImageIcon, Video } from "lucide-react";
import Image from "next/image";

const CoverImage = ({ adminName }: { adminName: string }) => {
  const imageCount = 42;
  const videoCount = 15;
  const totalLikes = 12345;

  function formatNumber(num: number) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  return (
    <div className="h-44 overflow-hidden relative">
      <Image
        src={"/featured/featured10.jpg"}
        className="h-full w-full object-cover select-none pointer-events-none"
        fill
        alt="Horse Cover Image"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-transparent"
        aria-hidden="true"
      />

      <div className="flex justify-between items-center absolute top-0 left-0 px-2 py-1 z-20 w-full">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-white">
            <p className="font-bold">{adminName}</p>

            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1">
                <ImageIcon className="w-4 h-4" />
                <span className="text-sm font-bold">{imageCount}</span>
              </div>

              <span className="text-xs">•</span>
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                <span className="text-sm font-bold">{videoCount}</span>
              </div>

              <span className="text-xs">•</span>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-bold">
                  {formatNumber(totalLikes)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverImage;
