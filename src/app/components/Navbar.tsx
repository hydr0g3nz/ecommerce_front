"use client";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SearchBar from "./SearchBar";
import CartModal from "./CartModal";
import StoreProvider from "@/StoreProvider";

const menu: { title: string; href: string }[] = [
  { title: "Home", href: "/home" },
  { title: "Sliders 1", href: "/slider-1" },
  { title: "Sliders 2", href: "/slider-2" },
  { title: "Blog", href: "/blog" },
  { title: "about", href: "/about" },
  { title: "login", href: "/login" },
  { title: "list", href: "/list" },
];

export default function NavigationMenuDemo() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="h-20 w-full bg-base-200  flex items-center justify-center relative">
      <NavigationMenu>
        <NavigationMenuList className="px-5">
          <NavigationMenuItem>
            {menu.map((item) => (
              <Link href={item.href} key={item.title} passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
        <SearchBar />
        <div
          className="relative cursor-pointer ml-5"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <Image src="/cart.png" alt="" width={22} height={22} />
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
            5
          </div>
        </div>
        {/* <StoreProvider> */}
          <CartModal isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        {/* </StoreProvider> */}
      </NavigationMenu>
    </div>
  );
}
