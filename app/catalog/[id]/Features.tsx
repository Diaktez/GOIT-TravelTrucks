import { Camper } from '@/types/camper';
import css from './Features.module.css';

interface Props {
  camper: Camper;
}

export default function Features({ camper }: Props) {
  const featuresConfig = [
    {
      label: camper.transmission,
      icon: 'icon-automatic',
      condition: true,
    },
    {
      label: camper.engine,
      icon: 'icon-fuel-pump',
      condition: true,
    },

    { label: 'AC', icon: 'icon-wind', condition: camper.AC },
    { label: 'Kitchen', icon: 'icon-cup-hot', condition: camper.kitchen },
    { label: 'Bathroom', icon: 'icon-shower', condition: camper.bathroom },
    { label: 'Gas', icon: 'icon-gas', condition: camper.gas },
    { label: 'TV', icon: 'icon-tv', condition: camper.TV },
    { label: 'Microwave', icon: 'icon-microwave', condition: camper.microwave },
    { label: 'Radio', icon: 'radio', condition: camper.radio },
    { label: 'Water', icon: 'icon-water-drop', condition: camper.water },
    {
      label: 'Refrigerator',
      icon: 'icon-fridge',
      condition: camper.refrigerator,
    },
  ];

  const formatForm = (form: string) => {
    const formMap: Record<string, string> = {
      panelTruck: 'Panel truck',
      fullyIntegrated: 'Fully integrated',
      alcove: 'Alcove',
    };

    return formMap[form] || form.charAt(0) + form.slice(1);
  };

  const addSpace = (value: string) => {
    return value.replace(/(\d)([a-zA-Z])/g, '$1 $2');
  };
  return (
    <div className={css.featuresContentOnly}>
      <div className={css.badgesGrid}>
        {featuresConfig.map((feature, index) => {
          if (!feature.condition) return null;

          return (
            <span key={index} className={css.badge}>
              <svg width={20} height={20}>
                <use href={`/icons.svg#${feature.icon}`}></use>
              </svg>

              <span style={{ textTransform: 'capitalize' }}>
                {feature.label}
              </span>
            </span>
          );
        })}
      </div>

      <div className={css.detailsTable}>
        <h3 className={css.detailsTitle}>Vehicle details</h3>
        <ul className={css.specsList}>
          <li>
            <span>Form</span>
            <span className={css.form}>{formatForm(camper.form)}</span>
          </li>
          <li>
            <span>Length</span>
            <span>{addSpace(camper.length)}</span>
          </li>
          <li>
            <span>Width</span>
            <span>{addSpace(camper.width)}</span>
          </li>
          <li>
            <span>Height</span>
            <span>{addSpace(camper.height)}</span>
          </li>
          <li>
            <span>Tank</span>
            <span>{addSpace(camper.tank)}</span>
          </li>
          <li>
            <span>Consumption</span>
            <span>{addSpace(camper.consumption)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
