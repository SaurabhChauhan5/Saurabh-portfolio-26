import { Seo } from '@shared-components';
import NotFoundPage from '../components/notfound/index';

const NotFound = (): JSX.Element => (
  <>
    <Seo title="Page not found | Saurabh Chauhan" path="/404" noindex />
    <NotFoundPage />
  </>
);

export default NotFound;
