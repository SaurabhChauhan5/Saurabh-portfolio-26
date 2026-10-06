import { Seo } from '@shared-components';
import { PROFILE } from '@utils/data';
import { breadcrumbLd } from '../shared/components/seo';

import ConnectPage from '../components/connect/index';
import CONTACT_FAQ from '../components/connect/faq';

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CONTACT_FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
};

const Contact = (): JSX.Element => (
  <>
    <Seo
      title={`Contact ${PROFILE.name} | SEO Specialist in Gurugram, India`}
      description="Get in touch with Saurabh Chauhan, SEO Specialist in Gurugram, India, for technical, local and eCommerce SEO. Contact by email, phone or LinkedIn."
      path="/connect"
      jsonLd={[
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/connect' }
        ]),
        faqLd
      ]}
    />
    <ConnectPage />
  </>
);

export default Contact;
