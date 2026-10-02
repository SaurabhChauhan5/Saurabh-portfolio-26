import Landing from './landing';
import Stats from './stats';
import About from './about';
import Expertise from './expertise';
import Platforms from './platforms';
import CaseStudies from './case-studies';
import Clients from './clients';
import PlatformExperience from './platform-experience';
import Experience from './experience';
import Projects from './projects';
import Foundation from './foundation';
import Contact from './contact';

const HomePage = (): JSX.Element => {
  return (
    <div className="home">
      <Landing />
      <Stats />
      <About />
      <Expertise />
      <Platforms />
      <CaseStudies preview />
      <Clients />
      <PlatformExperience />
      <Experience preview />
      <Projects />
      <Foundation />
      <Contact />
    </div>
  );
};

export default HomePage;
