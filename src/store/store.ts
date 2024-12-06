import { create } from 'zustand';

interface RootState {
  isFirstRender: boolean;
  setIsFirstRender: (value: boolean) => void;
  modalIsOpen: boolean;
  toggleModal: (value: boolean) => void;
  galleryPage: number;
  setGalleryPage: (page: number) => void;
}

const useAppStore = create<RootState>((set) => ({
  isFirstRender: true,
  setIsFirstRender: (value) =>
    set((state) => ({ isFirstRender: (state.isFirstRender = value) })),
  modalIsOpen: false,
  toggleModal: () =>
    set((state) => ({ modalIsOpen: (state.modalIsOpen = !state.modalIsOpen) })),
  galleryPage: 0,
  setGalleryPage: (page: number) =>
    set((state) => ({ galleryPage: (state.galleryPage = page) })),
}));

export default useAppStore;
