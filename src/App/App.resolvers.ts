import { getAllOrtalioMediaDataResolver, getSiteGlobalDataResolver } from '../Pages/HomePage/HomePage.resolvers';

const appResolvers = {
    Query: {
      globalData: getSiteGlobalDataResolver,
      data: getAllOrtalioMediaDataResolver,
    }
};

export default appResolvers;