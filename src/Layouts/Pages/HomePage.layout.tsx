import * as React from 'react'
import Helmet from 'react-helmet'
// import AudioItemPlayer from '../components/AudioItemPlayer/AudioItemPlayer';
import Header from '../../Components/Header/Header'
import LayoutRoot from '../LayoutRoot'
import LayoutMain from '../LayoutMain'
// import SocialIcons from '../components/SocialIcons/SocialIcons';
import 'modern-normalize'
import '../../Common/normalize'
import { GlobalData } from '../../Pages/HomePage/HomePage.models';

interface IndexLayoutProps {
  globalData: GlobalData;
}

const HomePageLayout: React.FC<IndexLayoutProps> = ({
    globalData,
    children 
}) => { 
    const description = globalData.siteDescription
        .replace('{%param%}',(new Date()).toLocaleDateString('pl-PL', {  
            day : 'numeric',
            month : 'long',
            year : 'numeric'
        }
    ));

    return (
        <LayoutRoot>
            <Helmet
                title={globalData.metaTitle}
                meta={[
                    { name: 'description', content: globalData.metaDescription },
                    { name: 'keywords', content: globalData.metaKeywords },
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
                intro={globalData.siteIntro}
                title={globalData.siteTitle}
                description={description}
            />
            <LayoutMain>{children}</LayoutMain>
            {/* <AudioItemPlayer /> */}
        </LayoutRoot>
    )
};

export default HomePageLayout;
