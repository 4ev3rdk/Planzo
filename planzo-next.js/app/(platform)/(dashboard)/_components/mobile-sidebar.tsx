"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
// Importing the custom hook 'useMobileSidebar' from your project’s hooks directory. This hook manages the state of the mobile sidebar using Zustand.
import { usePathname } from "next/navigation";
// Importing Next.js’s 'usePathname' hook.
// It helps us get the current URL path so we can know which page the user is on.
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";
// This hook is used to create and manage state within this component.
export const MobileSidebar = () => {

    const pathname = usePathname();
    // Using 'usePathname' to get the current path from the URL.

    const [isMounted, setIsMounted] = useState(false);
    // Creating a state variable 'isMounted' initialized to 'false'.
    // This could be used later to track if the component has fully loaded or mounted.

    const onOpen = useMobileSidebar((state) => state.onOpen);
    // Using the Zustand hook to extract the 'onOpen' function from the sidebar’s state.
    // Calling 'onOpen' will change the state to open the sidebar (isOpen = true).
    const onClose = useMobileSidebar((state) => state.onClose);
    const isOpen = useMobileSidebar((state) => state.isOpen);


    useEffect(() => {
        setIsMounted(true);
    },
        []
    );

    useEffect(() => {
        onClose();
    },
        [pathname, onClose]
    );

    if (!isMounted) {
        return null;
    }
    return (
        <>

            <Button onClick={onOpen} size="sm" variant="ghost" className="md:hidden block mr-2">
                <Menu className="h-4 w-4" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-2 pt-10">

                    <Sidebar
                        storageKey="p-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>

        </>
    );
};
