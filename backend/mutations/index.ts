import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import subscribeToDefault from './subscribeToDefault';
import createTextPost from './createTextPost';

// fake syntax tagged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
        subscribeToDefault(id: ID): User
        createTextPost(content: String title: String! subreddit_id: ID!): Post
    }
  `,

  resolvers: {
    Mutation: {
        subscribeToDefault,
        createTextPost,
    },
  },
});

