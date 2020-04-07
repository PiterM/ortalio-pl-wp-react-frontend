import * as React from 'react'
import Helmet from 'react-helmet'
// import AudioItemPlayer from '../components/AudioItemPlayer/AudioItemPlayer';
import Header from '../../Components/Header/Header'
import LayoutRoot from '../LayoutRoot'
import LayoutMain from '../LayoutMain'
// import SocialIcons from '../components/SocialIcons/SocialIcons';
import 'modern-normalize'
import '../../Common/normalize'

interface IndexLayoutProps {
  intro: string;
  description: string;
}

const HomePageLayout: React.FC<IndexLayoutProps> = ({ children }) => (
    <LayoutRoot>
        <Helmet
            title={'tytuł strony'}
            meta={[
            { name: 'description', content: 'description strony' },
            { name: 'keywords', content: 'keywords strony' },
            { name: 'viewport', content: "width=device-width" }
            ]}
            link={[
            {
                href: 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900,400italic,700italic,900italic|Droid+Serif:400,700,400italic,700italic',
                rel: 'stylesheet',
                type: 'text/css'
            }
            ]}
        />
        <Header
            intro={'moje intro'}
            title={'ORTALIO'}
            description={'jakiś description pod spodem'}
        />
        {/* <SocialIcons /> */}
        <LayoutMain>{children}</LayoutMain>
        {/* <AudioItemPlayer /> */}
    </LayoutRoot>
)

export default HomePageLayout;
