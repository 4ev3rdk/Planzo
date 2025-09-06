import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrgPage() {
    return (
        <OrganizationList
            afterSelectOrganizationUrl="/organization/:id"
            afterCreateOrganizationUrl="/organization/:id"

        />

    );

};