"use client";

import * as React from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Work", link: "#work" },
  { name: "Services", link: "#services" },
  { name: "About", link: "#about" },
  { name: "Contact", link: "#contact" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Navbar>
      <NavBody>
        {/* Brand */}
        <a href="#" className="group flex items-center gap-2 relative z-20">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-slate-900 to-slate-500 transition-transform duration-300 ease-out group-hover:scale-150" />
          <span className="text-sm font-semibold tracking-tight text-slate-900">SeventeenLabs</span>
        </a>

        <NavItems items={navItems} />

        <div className="flex items-center space-x-2">
          <NavbarButton href="#contact" variant="primary">
            Get Started
          </NavbarButton>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          {/* Brand */}
          <a href="#" className="group flex items-center gap-2 relative z-20">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-slate-900 to-slate-500 transition-transform duration-300 ease-out group-hover:scale-150" />
            <span className="text-sm font-semibold tracking-tight text-slate-900">SeventeenLabs</span>
          </a>
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              onClick={() => setIsOpen(false)}
              className="block text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <NavbarButton href="#contact" variant="primary" className="mt-4">
            Get Started
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
