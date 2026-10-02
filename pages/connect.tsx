import { Seo } from '@shared-components';
import { breadcrumbLd } from '../shared/components/seo';
import { PROFILE } from '@utils/data';

import ConnectPage from '../components/connect/index';

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
        ])
      ]}
    />
    <ConnectPage />
  </>
);

export default Contact;
