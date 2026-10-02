import { Seo } from '@shared-components';
import Experience from '../components/home/experience';
import { PROFILE } from '@utils/data';

// /work permanently redirects to /#experience (see next.config.js); this page
// only renders if that redirect is ever removed.
const Work = (): JSX.Element => (
  <>
    <Seo title={`Experience | ${PROFILE.name}, SEO Specialist`} path="/" />
    <div className="pt-20">
      <Experience />
    </div>
  </>
);

export default Work;
