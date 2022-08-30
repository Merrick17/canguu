import create from "zustand";

interface settingState {
    openDrawer: boolean;
    search: string,
    onSearchChange: (v: string) => void,
    toggleDrawer: (v: boolean) => void

}


const useSettingState = create<settingState>((set) => ({
    openDrawer: false,
    search: "",
    onSearchChange: (s: string) => set(() => ({search: s})),
    toggleDrawer: (v: boolean) => set(() => ({openDrawer: v})),
}));

export {useSettingState}