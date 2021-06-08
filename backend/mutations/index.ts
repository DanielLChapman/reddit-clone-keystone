import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import subscribeToDefault from './subscribeToDefault';
import createVariedPost from './createPost';
import getFrontPage from '../queries/getFrontPage';

// fake syntax tagged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
        subscribeToDefault(id: ID): User
        createVariedPost(content: String title: String! subreddit_id: ID!, type: String!, link: String): Post
    }
    type Query {
      getFrontPage(name: String): [Post]
    }
  `,

  resolvers: {
    Mutation: {
        subscribeToDefault,
        createVariedPost,
    },
    Query: {
        getFrontPage,
    }
  },
});

