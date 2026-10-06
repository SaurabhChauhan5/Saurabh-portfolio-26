/* eslint-disable react/require-default-props */
import { TECH_ICONS } from '@utils/data';

// A technology chip with its logo, when we have one.
export default function TechTag({
  name,
  large = false
}: {
  name: string;
  large?: boolean;
}): JSX.Element {
  const icon = TECH_ICONS[name];
  return (
    <li className={`chip ${large ? 'chip-lg' : ''} inline-flex items-center gap-2`}>
      {icon && (
        <img
          src={icon}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          className="w-4 h-4 object-contain"
        />
      )}
      {name}
    </li>
  );
}
