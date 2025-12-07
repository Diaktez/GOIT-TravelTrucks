import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';
import {
  Camper,
  EquipmentFilter,
  FiltersState,
  VehicleType,
} from '@/types/camper';

interface StoreState {
  campers: Camper[];
  isLoading: boolean;
  error: string | null;

  page: number;
  hasMore: boolean;

  filters: FiltersState;
  favorites: Camper[];

  setFilterLocation: (location: string) => void;
  toggleEquipment: (equipment: EquipmentFilter) => void;
  setVehicleType: (type: VehicleType) => void;

  fetchCampers: (page?: number) => Promise<void>;
  loadMore: () => void;
  toggleFavorite: (camper: Camper) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      campers: [],
      isLoading: false,
      error: null,
      page: 1,
      hasMore: true,
      favorites: [],

      filters: {
        location: '',
        equipment: [],
        type: null,
      },

      setFilterLocation: location =>
        set(state => ({ filters: { ...state.filters, location } })),

      toggleEquipment: item =>
        set(state => {
          const hasItem = state.filters.equipment.includes(item);
          const newEquipment = hasItem
            ? state.filters.equipment.filter(e => e !== item)
            : [...state.filters.equipment, item];
          return { filters: { ...state.filters, equipment: newEquipment } };
        }),

      setVehicleType: type =>
        set(state => ({
          filters: {
            ...state.filters,
            type: state.filters.type === type ? null : type,
          },
        })),

      fetchCampers: async (page = 1) => {
        set({ isLoading: true, error: null });

        try {
          const { filters } = get();
          const limit = 4;
          const params = new URLSearchParams();

          params.append('page', page.toString());
          params.append('limit', limit.toString());

          if (filters.location) params.append('location', filters.location);
          if (filters.type) params.append('form', filters.type);

          filters.equipment.forEach(eq => {
            if (eq === 'automatic') {
              params.append('transmission', 'automatic');
            } else {
              params.append(eq, 'true');
            }
          });

          const { data } = await api.get(`/campers?${params.toString()}`);

          set(state => {
            const items = Array.isArray(data)
              ? data
              : (data as any).items || [];

            const newCampers =
              page === 1 ? items : [...state.campers, ...items];

            return {
              campers: newCampers,
              page: page,
              isLoading: false,
              hasMore: items.length === limit,
            };
          });
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            set({
              campers: [],
              hasMore: false,
              isLoading: false,
              error: null,
            });
            return;
          }
          console.error('Critical Fetch error:', error);
          let errorMessage = 'Failed to fetch campers';
          if (error.message === 'Network Error' || !navigator.onLine) {
            errorMessage = 'No internet connection. Please check your network.';
          }

          set({ error: errorMessage, isLoading: false });
        }
      },
      loadMore: () => {
        const { page, fetchCampers, hasMore, isLoading } = get();

        if (hasMore && !isLoading) {
          fetchCampers(page + 1);
        }
      },

      toggleFavorite: camper =>
        set(state => {
          const isFav = state.favorites.some(c => c.id === camper.id);
          const newFavorites = isFav
            ? state.favorites.filter(c => c.id !== camper.id)
            : [...state.favorites, camper];
          return { favorites: newFavorites };
        }),
    }),
    {
      name: 'travel-trucks-storage',
      partialize: state => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
