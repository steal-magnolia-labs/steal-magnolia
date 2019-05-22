/* eslint-disable prettier/prettier */
// this will be the request
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');
const db = require('../database');

const NodeType = new GraphQLObjectType({
  name: 'Node',
  fields: () => ({
    nodeId: { type: GraphQLInt },
  }),
});
const NodeQuery = new GraphQLObjectType({
  name: 'NodeQuery',
  fields: {
    node: {
      type: NodeType,
      args: {id: { type: GraphQLInt },},
      resolve(parent, args) {
        return db
          .query(`SELECT * FROM nodes WHERE id=${args.id}`)
          .then(node => 
            // when return data make it comes back in the form type field expects
             ({nodeId:node[0].id})
          ).catch(err =>{
              console.error('Internal database error')
          });
      },
    },
  },
});

const NodeMutation = new GraphQLObjectType({
  name: 'NodeMutation',
  fields: {
    deleteNode: {
      type: NodeType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // this is where I am going to query the database and delete the node from it
        console.log('I am the parent', parent);
        return db
          .query(
            `DELETE * FROM nodes WHERE id=${args.id} OR parent_id=${args.id}`
          )
          .then(res => console.log('deleted nodes from the database', res))
          .catch(err =>
            console.error('there was an interal database problem', err)
          );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: NodeQuery,
  mutation: NodeMutation,
});
