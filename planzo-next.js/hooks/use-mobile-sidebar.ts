import { create } from "zustand";
type MobileSidebarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};
//set(provided by zustand) is used to update the state
export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));