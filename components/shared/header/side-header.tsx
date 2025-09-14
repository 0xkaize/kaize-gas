"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiHide, BiShow } from "react-icons/bi";

interface Props {
  globalVisible: boolean;
  toggleAll: () => void;
}

export const SideHeader = ({ globalVisible, toggleAll }: Props) => {
  return (
    <div className="flex justify-between items-center py-4 max-w-7xl mx-auto">
      <div className="inline-flex items-center gap-3 text-xl font-semibold">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src="https://pbs.twimg.com/profile_images/1967143269285888000/v-1qYWiW_400x400.jpg"
            draggable={false}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2>Kaizegas</h2>
      </div>

      <p
        onClick={toggleAll}
        className="flex items-center gap-1 text-sm font-extralight cursor-pointer"
      >
        {globalVisible ? (
          <>
            <BiHide className="w-4 h-4" /> Hide all
          </>
        ) : (
          <>
            <BiShow className="w-4 h-4" /> Show all
          </>
        )}
      </p>
    </div>
  );
};
