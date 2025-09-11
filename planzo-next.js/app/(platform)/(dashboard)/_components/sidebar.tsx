//desktop sidebar

"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { NavItem, Organization } from "./nav-item";

// this means to run file on client side nextjs bydefault run on server side

interface SidebarProps {
    storageKey?: string;   //storage keu=y to keep track of what was open and what wasnt
};

export const Sidebar = ({ storageKey = "p-sidebar-state" }: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {}); //uselocal is hook that stores data in local browser from given key(here storageKey ) // expanded is current status //setexpanded is to change that state and save it to local storage
    //record <string any> tells typescript , STORED VALUE IS OBJECT(WHERE KEYS ARE STRING AND VALUE ANY)


    //userOrganization is hook provided by clerk, returning organization related data
    //DESTRUCTING is used to access properties from the object that userOrganization returns
    // organization and isLoaded are property renamed respectively so it can be anything   
    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();
    const { userMemberships, isLoaded: isLoadedList } = useOrganizationList({ userMemberships: { infinite: true } });

    //defaultAccordionValue → builds a list of sections that should be open initially.
    //object.keys(expanded) gets all the object with keys from expanded object(project names)
    //.reduce goes through each keys and collect which are true(which are open) so which sections be open initially
    const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
        if (expanded[key]) {
            acc.push(key);
        }
        return acc;
    }, []);


    //function which will add something to expand(open/close)
    //setExpanded((curr) => ...) → takes the current state (curr) and returns a new state object.
    //...cur copies all existing prop of expanded  
    const onExpand = (id: string) => {
        setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
    };

    if (!isLoadedOrg || !isLoadedList || userMemberships.isLoading) {
        return (
            <>
                {/* 
    Purpose: Show a placeholder/loading UI while data is loading. */}
                <Skeleton />
            </>
        );
    }
    return (
        <> {/*react fragment let you wrap multiple JSX element adding extra DOM element(more than one) */}
            <div className="flex items-center text-xs font-medium mb-1 ">
                <span className="pl-4"> worskspaces</span>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <Link href="/select-org">
                        <Plus className="h=4 w=4" />
                    </Link>
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                {userMemberships.data.map(({ organization }) => (
                    <NavItem
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        organization={organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>


    );
};
export default Sidebar;