import { create } from "zustand";
import axios from "axios";
import debounce from "lodash.debounce";

interface StoreState {
  searchTerm: string;
  suggestions: any[];
  loading: boolean;
  showSuggestions: boolean;
  setSearchTerm: (term: string) => void;
  fetchSuggestions: (term: string) => void;
  setShowSuggestions: (value: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  searchTerm: "",
  suggestions: [],
  loading: false,
  showSuggestions: false,

  setSearchTerm: (term: string) => set(() => ({ searchTerm: term })),

  setShowSuggestions: (value: boolean) =>
    set(() => ({ showSuggestions: value })),

  fetchSuggestions: debounce(async (term: string) => {
    if (!term) {
      set(() => ({ suggestions: [] }));
      return;
    }

    set(() => ({ loading: true }));

    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${term}&size=5`
      );
      set(() => ({ suggestions: response.data.objects }));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      set(() => ({ suggestions: [] }));
    } finally {
      set(() => ({ loading: false }));
    }
  }, 300),
}));

export default useStore;
