import { create } from 'zustand';

interface RootState {
  modalIsOpen: boolean;
  toggleModal: (value: boolean) => void;
  galleryPage: number;
  setGalleryPage: (page: number) => void;
}

const useAppStore = create<RootState>((set) => ({
  modalIsOpen: false,
  toggleModal: () =>
    set((state) => ({ modalIsOpen: (state.modalIsOpen = !state.modalIsOpen) })),
  galleryPage: 0,
  setGalleryPage: (page: number) =>
    set((state) => ({ galleryPage: (state.galleryPage = page) })),
}));

export default useAppStore;
