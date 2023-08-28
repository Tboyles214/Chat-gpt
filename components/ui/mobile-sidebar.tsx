"use client";

import { Button } from "./button";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTrigger } from "./sheet";
import SideBar from "./Sidebar";
import { useState,useEffect } from "react";

const MobileSideBar = () => {
    const  [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className="p-0">
        <SideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
