import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const DashboardNavbar = () => {
    return (
        <nav className="top-0 border-b shadow-sm h-14 bg-white flex  items-center fixed z-50 px-4 w-full">

            <div className=" flex items-center gap-x-4">

                <div className="hidden md:flex"> <Logo /> </div>
                <div>
                    <Button variant="primary" size="sm" className="hidden md:block rounded-sm h-auto py-1.5 px-2">
                        Create
                    </Button>
                    <Button variant="primary" size="sm" className="rounded-sm block md:hidden">
                        <Plus />
                    </Button>
                </div>

            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }
                    }} />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30
                            }
                        }
                    }}
                />


            </div>
        </nav>

    );
};
export default DashboardNavbar;