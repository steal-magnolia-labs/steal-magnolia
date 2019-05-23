/* eslint-disable no-loop-func */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable prettier/prettier */
// this will be the request
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLID
} = require('graphql');
// const axios = require('axios');
const db = require('../database');

const NodeType = new GraphQLObjectType({
  name: 'Node',
  fields: () => ({
    nodeId: { type: GraphQLID },
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
function getTree(rootNodeid){
    db.many(`SELECT project_id FROM nodes WHERE id = ${rootNodeid}`)
    .then(projectID =>db.many(`SELECT * FROM nodes WHERE project_id = ${projectID[0].project_id}`).then(project =>{console.log(project)}))
    .catch(err => console.log(err))
}

async function deleteNodes (nodeID){

const parentNodeList = [nodeID];
let nodeCount = 0;
while (nodeCount <= parentNodeList.length){
  await  db.query(`SELECT * FROM nodes WHERE parent_id=${parentNodeList[nodeCount]}`)
    .then(nodes =>{
        console.log('these are the nodes', nodes)
        nodes.forEach(childNode =>{
            parentNodeList.push(childNode.id);
        })
    }).catch(err => console.error('This node has no childern',parentNodeList[nodeCount]))
    nodeCount+=1;
}

parentNodeList.forEach((node ,index)=>{
    if(index !== 0){
        db.query(`DELETE FROM nodes WHERE id=${node}`);
    }
} )
// console.log('This is the node list', parentNodeList);
// try {await db.query('DElETE FROM nodes WHERE id IN VALUES (${nodeList}) ',{nodeList : parentNodeList})}
// catch(error){
//     console.log('error in the delete')
// }
return parentNodeList;
}

const NodeMutation = new GraphQLObjectType({
  name: 'NodeMutation',
  fields: {
    deleteNode: {
      type: NodeType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return deleteNodes(args.id).then(deletedNodes => {
            console.log('this is the tree',getTree(args.id));
           return {nodeId: String(deletedNodes)}
        } ).catch(err => console.log('nodes not deleted'));
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: NodeQuery,
  mutation: NodeMutation,
});

        // // this is where I am going to query the database and delete the node from it
        // console.log('I am the parent', parent);
        // let currNodes;
        // return db
        // .query(`SELECT * FROM nodes WHERE id=${args.id} OR parent_id=${args.id}`)
        // .then(nodes =>{
        //     console.log('These are the nodes',nodes);
        //     currNodes = {nodeId:nodes.map(node=> node.id)};
        //     console.log('these are the node list', currNodes)
        //     return db
        //       .query(
        //         `DELETE FROM nodes WHERE id=${args.id} OR parent_id=${args.id}`
        //       )
        //       .then(()=>{
        //             console.log('I am the curr node',currNodes)
        //          return {deleteNode: currNodes}
        //         })
        //       .catch(err =>
        //         console.error('there was an interal database problem', err)
        //       );
        // }
        //   // when return data make it comes back in the form type field expects
        // ).catch(err =>{
        //     console.error('Internal database error')
        // });