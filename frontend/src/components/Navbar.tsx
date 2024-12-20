import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { NavItems } from "./NavItems";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "./UserAccountNav";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/serverSideUser";

export const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log("Usuario desde Navbar:", user);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className=" flex flex-col border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/*TODO: Mobile Nav*/}

              <div className="ml-4 flex  lg:ml-0">
                <Link rel="stylesheet" href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Logueate
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200 aria-hidden:true" />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href={"/sign-up"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Crea una Cuenta
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};
