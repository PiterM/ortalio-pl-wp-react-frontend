import { getAllOrtalioMediaDataResolver } from '../Pages/HomePage/HomePage.resolvers';

const appResolvers = {
    Query: {
      data: getAllOrtalioMediaDataResolver
    }
};

export default appResolvers;