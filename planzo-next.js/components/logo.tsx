import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";


const headingFont = localFont({
    src: "../public/fonts/CalSans-Regular.woff2"
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <Image
                    src="/logo.svg"
                    height={30}
                    width={30}
                    alt="Logo"
                />

                <p className={cn("text-lg text-neutral-700 pb-1", headingFont.className)}>
                    Planzo
                </p>
            </div>

        </Link>

    );
};