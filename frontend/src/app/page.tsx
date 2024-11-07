import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
   <MaxWidthWrapper>
    <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Banana Slipt <span className="text-red-600">Fresas con Crema</span></h1>
    </div>

    <div className= "flex flex-col sm:flex-row gap-4 mt-6 justify-center">
      <Link href="/ciudades" className={buttonVariants()}>
      Buscar Ciudades
      </Link>
    </div>

    {/* TODO: PUBLICATIONS*/}
   </MaxWidthWrapper>
  );
}
