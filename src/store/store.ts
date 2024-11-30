import { create } from 'zustand';

interface RootState {
  modalIsOpen: boolean;
  toggleModal: (value: boolean) => void;
}

const useAppStore = create<RootState>((set) => ({
  modalIsOpen: true,
  toggleModal: () =>
    set((state) => ({ modalIsOpen: (state.modalIsOpen = !state.modalIsOpen) })),
}));

export default useAppStore;
