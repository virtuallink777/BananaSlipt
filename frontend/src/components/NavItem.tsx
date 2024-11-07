"use client";

import { CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Category = (typeof CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, category, handleOpen, isOpen }: NavItemProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foregorund", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      {/* Mostrar el valor seleccionado */}
      {selectedValue && (
        <div className="ml-2 px-3 py-1.5 bg-gray-100 rounded-md text-sm min-w-[100px] text-center">
          {selectedValue}
        </div>
      )}

      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-white shadow"
            aria-hidden
          />

          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.features.map((feature, featureIdx) => (
                    <div key={featureIdx}>
                      {feature.name.map((item, itemIdx) => (
                        <div
                          key={`${featureIdx} - ${itemIdx}`}
                          className="group relative text-base sm:text-sm"
                        >
                          {/* Aquí renderizamos los valores */}
                          {Object.entries(item).map(([value], index) => (
                            <div
                              key={index}
                              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
                              onClick={() => {
                                setSelectedValue(value);
                                handleOpen();
                              }}
                            >
                              {value}
                            </div>
                          ))}
                        </div>
                      ))}
                      <div className="bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
