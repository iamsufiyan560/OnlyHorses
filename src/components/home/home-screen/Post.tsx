"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Prisma, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Heart,
  ImageIcon,
  LockKeyholeIcon,
  MessageCircle,
  Trash,
} from "lucide-react";
import { CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deletePostAction } from "./actions";

type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        user: true;
      };
    };
    likesList: true;
  };
}>;

const Post = ({
  post,
  isSubscribed,
  admin,
}: {
  post: PostWithComments;
  isSubscribed: boolean;
  admin: User;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useKindeBrowserClient();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async () => await deletePostAction(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-col gap-3 p-3 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={admin.image || "/user-placeholder.png"}
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm md:text-md">{admin.name}</span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-zinc-400 text-xs md:text-sm tracking-tighter">
            17.06.2024
          </p>

          {admin.id === user?.id && (
            <Trash
              className="w-5 h-5 text-muted-foreground hover:text-red-500 cursor-pointer"
              onClick={() => deletePost()}
            />
          )}
        </div>
      </div>

      <p className="text-sm md:text-md">{post.text}</p>

      {(post.isPublic || isSubscribed) &&
        post.mediaUrl &&
        post.mediaType === "image" && (
          <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
            <Image
              src={post.mediaUrl}
              alt="Post Image"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        )}

      {(post.isPublic || isSubscribed) &&
        post.mediaUrl &&
        post.mediaType === "video" && (
          <div className="w-full mx-auto">
            <CldVideoPlayer
              width="960"
              height={540}
              className="rounded-md"
              src={post.mediaUrl}
            />
          </div>
        )}

      {!isSubscribed && !post.isPublic && (
        <div
          className="w-full bg-slate-800 relative h-96 rounded-md bg-of flex flex-col justify-center
          items-center px-5 overflow-hidden
        "
        >
          <LockKeyholeIcon className="w-16 h-16 text-zinc-400 mb-20 z-0" />

          <div
            aria-hidden="true"
            className="opacity-60 absolute top-0 left-0 w-full h-full bg-stone-800"
          />

          <div className="flex flex-col gap-2 z-10 border p-2 border-gray-500 w-full rounded">
            <div className="flex gap-1 items-center">
              <ImageIcon className="w-4 h-4" />
              <span className="text-xs">1</span>
            </div>

            <Link
              className={buttonVariants({
                className: "!rounded-full w-full font-bold text-white",
              })}
              href={"/pricing"}
            >
              Subscribe to unlock
            </Link>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex gap-1 items-center">
          <Heart
            className={cn("w-5 h-5 cursor-pointer", {
              "text-red-500": isLiked,
              "fill-red-500": isLiked,
            })}
            onClick={() => setIsLiked(!isLiked)}
          />
          <span className="text-xs text-zinc-400 tracking-tighter">
            {post.likes}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <MessageCircle className="w-5 h-5 cursor-pointer" />
          <span className="text-xs text-zinc-400 tracking-tighter">
            {post.comments.length > 0 ? post.comments.length : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
