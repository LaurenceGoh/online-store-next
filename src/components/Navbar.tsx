"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import { fetchAllCategories } from "@/services/products";
import Link from "next/link";
export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchAllCategories();
        setCategories(categories);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem item="Home" >
          <Link href='/'>Home</Link>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="flex flex-wrap">
            <div className="flex flex-col w-1/2 space-y-4 text-sm px-2">
              <HoveredLink href="/products">
                <b>All Products</b>
              </HoveredLink>
              {categories
                .slice(0, Math.ceil(categories.length / 2))
                .map((category: string, index) => (
                  <HoveredLink key={index} href={`/products/${category}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </HoveredLink>
                ))}
            </div>
            <div className="flex flex-col w-1/2 space-y-4 text-sm px-2">
              {categories
                .slice(Math.ceil(categories.length / 2))
                .map((category: string, index) => (
                  <HoveredLink key={index} href={`/products/${category}`}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </HoveredLink>
                ))}
            </div>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
