/* eslint-disable react/require-default-props */
import {
  BarChart2,
  Droplet,
  FileText,
  Grid,
  Home,
  Key,
  Layers,
  Link2,
  MapPin,
  Settings,
  ShoppingBag,
  Tool,
  Truck,
  Zap
} from 'react-feather';

const ICONS = {
  settings: Settings,
  file: FileText,
  pin: MapPin,
  bag: ShoppingBag,
  link: Link2,
  chart: BarChart2,
  layers: Layers,
  truck: Truck,
  droplet: Droplet,
  zap: Zap,
  grid: Grid,
  home: Home,
  tool: Tool,
  key: Key
};

type Props = { name: string; size?: number; className?: string };

export default function Icon({ name, size = 22, className = '' }: Props): JSX.Element {
  const Component = ICONS[name] || MapPin;
  return <Component size={size} className={className} aria-hidden="true" focusable="false" />;
}
