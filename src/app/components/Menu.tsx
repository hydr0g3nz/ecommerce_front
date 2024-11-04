"use client";

import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button className="bg-slate-200 p-2 rounded shadow" onClick={() => setIsOpen(!isOpen)} > {isOpen ? "X" : "Menu"} </button>
      {isOpen && (
        <>
        <ul>
            <li><Link href="/products">List</Link></li>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/">alpha</Link></li>
            <li><Link href="/">beta</Link></li>
            <li><Link href="/">cat</Link></li>
        </ul>
        </>
      )}
    </div>
  );
};

export default Menu;
