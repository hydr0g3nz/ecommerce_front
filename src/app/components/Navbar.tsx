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
import { RootState } from "../../store/cartStore";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const menu: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "Login", href: "/login" },
];

export default function NavigationMenuDemo() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useAppSelector((state: RootState) => state.cart);
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
          {cart.items.length > 0 && (
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
              {cart.items.length}
            </div>
          )}
        </div>
        <CartModal isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        {/* </StoreProvider> */}
      </NavigationMenu>
    </div>
  );
}
