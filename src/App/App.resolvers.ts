import { 
  getAllOrtalioMediaDataResolver, 
  getSiteGlobalDataResolver,
  getSocialMediaDataResolver,
} from '../Pages/HomePage/HomePage.resolvers';

const appResolvers = {
    Query: {
      globalData: getSiteGlobalDataResolver,
      socialMediaData: getSocialMediaDataResolver,
      data: getAllOrtalioMediaDataResolver,
    }
};

export default appResolvers;