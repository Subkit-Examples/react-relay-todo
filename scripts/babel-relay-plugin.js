const GraphQLUtils = require('graphql/utilities');
const requestSync = require('sync-request');
const manifest = require('../package.json');
const babelRelayPlugin = require('babel-relay-plugin');

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || manifest.graphql.endpoint.url;
const GRAPHQL_ENDPOINT_TOKEN = process.env.GRAPHQL_ENDPOINT_TOKEN || manifest.graphql.endpoint.headers.Authorization;
let graphQLSchema = {data:{}};

console.log('Fetching GraphQL schema from ' + GRAPHQL_ENDPOINT);
const result = requestSync('POST', GRAPHQL_ENDPOINT, {
  json: {query: GraphQLUtils.introspectionQuery},
  headers: Object.assign({}, manifest.graphql.endpoint.headers, {Authorization: GRAPHQL_ENDPOINT_TOKEN}),
}).body.toString();

try {
  graphQLSchema = JSON.parse(result);
} catch(error) {
  console.error(`Fetch GraphQL schema error. ${error.message}`);
}
module.exports = babelRelayPlugin(graphQLSchema.data);
