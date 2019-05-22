import React, { Component } from 'react';
import Tree from 'react-d3-tree';

const myTreeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];

class ReactD3Tree extends Component {
  render() {
    console.log('d3tree props: ', this.props)
    return (

      <div style={{width: '50em', height: '20em'}}>
        {this.props.tree}
        <Tree data={this.props.treeData} />
      </div>
    );
  }
}

export default ReactD3Tree;