import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import subscribeToDefault from './subscribeToDefault';

// fake syntax tagged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
        subscribeToDefault(id: ID): User
    }
  `,

  resolvers: {
    Mutation: {
        subscribeToDefault
    },
  },
});