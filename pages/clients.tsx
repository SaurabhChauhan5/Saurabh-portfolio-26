import { Seo } from '@shared-components';
import { breadcrumbLd, PERSON_ID } from '../shared/components/seo';
import ClientsPage from '../components/clients/index';
import { ACTIVE_WEBSITES, CLIENT_GROUPS, PROFILE } from '@utils/data';

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Client websites managed by ${PROFILE.name}`,
  itemListElement: CLIENT_GROUPS.flatMap((g) => g.sites).map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'WebSite', name: s.name, url: `https://${s.domain}/` }
  })),
  author: { '@id': PERSON_ID }
};

const Clients = (): JSX.Element => (
  <>
    <Seo
      title={`Client Websites | ${PROFILE.name}, SEO Specialist`}
      description={`${ACTIVE_WEBSITES} active Australian business websites Saurabh Chauhan manages SEO for, grouped by industry: glass and glazing, removals, roofing, construction, electrical and more.`}
      path="/clients"
      jsonLd={[
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Clients', path: '/clients' }
        ]),
        itemListLd
      ]}
    />
    <ClientsPage />
  </>
);

export default Clients;
