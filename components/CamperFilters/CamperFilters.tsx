'use client';
import { useStore } from '@/store/useStore';
import css from './CamperFilters.module.css';
import style from '../UI/Button.module.css';
export default function CamperFilters() {
  const {
    filters,
    setFilterLocation,
    toggleEquipment,
    setVehicleType,
    fetchCampers,
  } = useStore();

  // Valid Input
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.startsWith(' ')) return;

    const regex = /^[a-zA-Z\s]*$/;

    if (regex.test(value)) {
      setFilterLocation(value);
    }
  };

  const handleSearch = () => {
    const trimmedLocation = filters.location.trim();
    if (trimmedLocation.length > 0 && trimmedLocation.length < 3) {
      alert('Please enter at least 3 characters');
      return;
    }

    fetchCampers(1);
  };

  const getButtonClass = (isActive: boolean) =>
    `${css.filterButton} ${isActive ? css.active : ''}`;

  return (
    <aside className={css.aside}>
      {/* Location */}
      <div className={css.section}>
        <label className={css.label}>Location</label>
        <div className={css.inputWrapper}>
          <svg width={20} height={20}>
            <use href="/icons.svg#icon-loc"></use>
          </svg>
          <input
            type="text"
            placeholder="City"
            className={css.input}
            value={filters.location}
            onChange={handleLocationChange}
            autoComplete="off"
            maxLength={35}
          />
        </div>
      </div>

      <div className={css.section}>
        <p className={css.labelFilter}>Filters</p>

        {/* Equipment */}
        <h3 className={css.h3}>Vehicle equipment</h3>
        <div className={`${css.filterGroup} ${css.filterGroupEquipment}`}>
          <button
            className={getButtonClass(filters.equipment.includes('AC'))}
            onClick={() => toggleEquipment('AC')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-wind"></use>
            </svg>
            <span>AC</span>
          </button>

          <button
            className={getButtonClass(filters.equipment.includes('automatic'))}
            onClick={() => toggleEquipment('automatic')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-automatic"></use>
            </svg>
            <span>Automatic</span>
          </button>

          <button
            className={getButtonClass(filters.equipment.includes('kitchen'))}
            onClick={() => toggleEquipment('kitchen')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-cup-hot"></use>
            </svg>
            <span>Kitchen</span>
          </button>

          <button
            className={getButtonClass(filters.equipment.includes('TV'))}
            onClick={() => toggleEquipment('TV')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-tv"></use>
            </svg>
            <span>TV</span>
          </button>

          <button
            className={getButtonClass(filters.equipment.includes('bathroom'))}
            onClick={() => toggleEquipment('bathroom')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-shower"></use>
            </svg>
            <span>Bathroom</span>
          </button>
        </div>

        {/* Type */}
        <h3 className={css.h3}>Vehicle type</h3>
        <div className={css.filterGroup}>
          <button
            className={getButtonClass(filters.type === 'panelTruck')}
            onClick={() => setVehicleType('panelTruck')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-van"></use>
            </svg>
            <span>Van</span>
          </button>

          <button
            className={getButtonClass(filters.type === 'fullyIntegrated')}
            onClick={() => setVehicleType('fullyIntegrated')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-integer"></use>
            </svg>
            <span>Fully Integrated</span>
          </button>

          <button
            className={getButtonClass(filters.type === 'alcove')}
            onClick={() => setVehicleType('alcove')}
          >
            <svg width={32} height={32}>
              <use href="/icons.svg#icon-integer"></use>
            </svg>
            <span>Alcove</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className={`${css.searchButton} ${style.button}`}
      >
        Search
      </button>
    </aside>
  );
}
