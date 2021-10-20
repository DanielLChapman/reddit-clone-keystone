import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import subscribeToDefault from './subscribeToDefault';
import createVariedPost from './createPost';
import updateArrow from './updateArrow';
import getFrontPage from '../queries/getFrontPage';
import getSearchResults from '../queries/getSearchResults';

// fake syntax tagged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
        subscribeToDefault(id: ID): User
        createVariedPost(content: String title: String! subreddit_id: ID!, type: String!, link: String): Post
    },
    type Query {
      getSearchResults(searchTerm: String!): [Subreddit]
    }

    
  `,

  resolvers: {
    Mutation: {
        subscribeToDefault,
        createVariedPost,
    },
    Query: {
        getSearchResults,
    }
  },
});

