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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const menu: { title: string; href: string }[] = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
];

export default function NavigationMenuDemo() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useAppSelector((state: RootState) => state.cart);
  const { role ,name} = useAuth();
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
        <Button
          variant="ghost"
          className="relative cursor-pointer ml-5"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <ShoppingCart className="h-[22px] w-[22px]" />
          {cart.items.length > 0 && (
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
              {cart.items.length}
            </div>
          )}
        </Button>
        <CartModal isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={false}>
              <CircleUserRound className="h-[22px] w-[22px]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {role && <p>{name} , {role}</p>}
            <Link href={`/admin/`}>
             {role === "admin" &&  <DropdownMenuItem className="flex justify-between">
                Admin
              </DropdownMenuItem>}
            </Link>
            {role === null ? (
              <Link href={`/login`}>
                <DropdownMenuItem className="flex justify-between">
                  Login
                </DropdownMenuItem>
              </Link>
            ) : (
              <DropdownMenuItem
                className="flex justify-between"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  window.location.reload();
                }}
              >
                Logout
              </DropdownMenuItem>
            )
            }
          </DropdownMenuContent>
        </DropdownMenu>
        {/* </StoreProvider> */}
      </NavigationMenu>
    </div>
  );
}
