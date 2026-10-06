/* eslint-disable react/require-default-props */
import {
  Activity,
  Bookmark,
  BookOpen,
  CheckCircle,
  Clipboard,
  Code,
  Cpu,
  Database,
  Eye,
  FileText,
  GitBranch,
  Key,
  Layout,
  Link2,
  List,
  MapPin,
  Search,
  Settings,
  Share2,
  ShoppingBag,
  Sliders,
  Tag,
  TrendingUp,
  Users,
  Zap
} from 'react-feather';

const BR = '/images/brands';

// Brand logos first (matched on the label, case-insensitive), then topic icons.
const BRANDS: [RegExp, string][] = [
  [/search console|\bgsc\b/i, `${BR}/googlesearchconsole.svg`],
  [/\bga4\b|google analytics/i, `${BR}/googleanalytics.svg`],
  [/semrush/i, `${BR}/semrush.svg`],
  [/pagespeed/i, `${BR}/pagespeedinsights.svg`],
  [/rank math/i, `${BR}/rankmath.png`],
  [/yoast/i, `${BR}/yoast.svg`],
  [/google business profile|\bgbp\b/i, `${BR}/google.png`],
  [/shopify/i, `${BR}/shopify.svg`],
  [/wordpress/i, `${BR}/wordpress.svg`],
  [/\bwix\b/i, `${BR}/wix.svg`],
  [/\bhtml\b/i, `${BR}/html5.svg`],
  [/github|\bgit\b/i, `${BR}/github.svg`]
];

const TOPICS: [RegExp, typeof Search][] = [
  [/schema/i, Share2],
  [/crawl/i, Search],
  [/index/i, Database],
  [/sitemap/i, GitBranch],
  [/robots/i, Cpu],
  [/canonical/i, Bookmark],
  [/structured data|semantic|code/i, Code],
  [/core web vitals|performance|speed/i, Activity],
  [/audit/i, Clipboard],
  [/meta|title|description|heading/i, Tag],
  [/keyword/i, Key],
  [/citation/i, BookOpen],
  [/listing|director/i, List],
  [/local/i, MapPin],
  [/competitor/i, Users],
  [/backlink|link/i, Link2],
  [/ecommerce|product|collection/i, ShoppingBag],
  [/structure|architecture|landing page/i, Layout],
  [/customi[sz]/i, Sliders],
  [/on-page|content/i, FileText],
  [/monitor|visibility/i, Eye],
  [/technical|issue/i, Settings],
  [/improvement|optimi[sz]/i, TrendingUp],
  [/off-page/i, Zap]
];

type Props = { label: string; size?: number; className?: string };

// Picks a fitting icon for an SEO topic or tool name.
export default function TopicIcon({ label, size = 15, className = '' }: Props): JSX.Element {
  const brand = BRANDS.find(([re]) => re.test(label));
  if (brand) {
    return (
      <img
        src={brand[1]}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        className={`flex-shrink-0 object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  const Cmp = TOPICS.find(([re]) => re.test(label))?.[1] || CheckCircle;
  return (
    <Cmp
      size={size}
      className={`flex-shrink-0 text-pink ${className}`}
      aria-hidden="true"
      focusable="false"
    />
  );
}
