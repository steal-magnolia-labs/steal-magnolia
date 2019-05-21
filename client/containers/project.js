import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Panel from './panel.js';
import * as d3 from "d3";

const ProjectCanvas = (props) => {

    //This is the project ID selected
    const project_id = props.match.params.id;

    //This is the keep track of the current node we are on
    const [currentNode, changeCurrentNode] = useState({ 
        "id": 0,
        "parent_id": '',
        "name": '',
        "stateful": false,
        "props": '',
        "count": ''
    });

    //This is to keep track of the current project tree
    const [projectTree, UpdateProjectTree] = useState([]);

    //This is to keep track of if the current tree has been updated
    const [projectUpdate, setProjectUpdate] = useState(false);

    //This function will get the entire tree information
    //This will be called after every update
    useEffect(() => { 

      // console.log('Got all the trees :)')

      const metaData = {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json'
        },
      }

      fetch(`/projects/${project_id}`, metaData)
        .then(response => response.json())
        .then(response => UpdateProjectTree(response))
        .catch(err => console.log('Error ', err))

    }, [projectUpdate]);

    //This function will add a new node to the database
    const addNewNode = (e) => {
        const parent_id = e.target.value;
        const metaData = {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                "parent_id": parent_id
            })
        }

        fetch(`/newnode/${project_id}`, metaData)
            .then(response => response.json())
            .then(response => {
                changeCurrentNode(response) //CHECK: what is the response structure?
                setProjectUpdate(true)
            }) //This triggers a event to get all tree values again
            .catch(err => console.log(err))

        console.log('new node added!!')
    }

    //This function will update a current node to the database
    const updateNode = (e) => {
        e.preventDefault();
        const metaData = {
            'method': 'POST',
            'headers': {
                'Content-type': 'application/json'
            },
            'body': JSON.stringify({
                "id": e.target.elements.componentName.id,
                "name": e.target.elements.componentName.value,
                "stateful": e.target.elements.stateful.checked,
                "count": e.target.elements.componentCount.value,
                "props": e.target.elements.props.value
            })
        };

        fetch(`/updateproject/${project_id}`, metaData)
          .then(response => response.json())
          .then((response) => {
            if (projectUpdate) setProjectUpdate(false);
            else setProjectUpdate(true);
          })
          .catch(err => console.log('err', err))
        
      // setProjectUpdate(true);
    }

    //This function will set the current node the user is viewing
    const setViewingNode = (e) => {
      const node_id = e.data.id;
      let currentNode = projectTree;
      const findNode = (node = currentNode) => {
        if (node.id === node_id) return currentNode = node;
        node.children.forEach(child => findNode(child));
      }
    findNode();
    changeCurrentNode(currentNode);
    }

    //This function will consistently update the current node on the form change

    const onInputChangeName = (e) => {
        changeCurrentNode({
            ...currentNode,
            "name": e.target.value
        })
    }

    const onInputChangeCount = (e) => {
        changeCurrentNode({
            ...currentNode,
            "count": e.target.value
        })
    }

    const onInputChangeProps = (e) => {
        changeCurrentNode({
            ...currentNode,
            "props": e.target.value
        })
    }

    const onInputChangeState = (e) => {

        changeCurrentNode({
            ...currentNode,
            "stateful": e.target.checked
        })
    }

    const root = d3.hierarchy(projectTree);
    const tree = d3.tree();
    
    tree.size([800, 850]);
    tree(root);
    d3.select('svg g.nodes')
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .classed('node', true)
      .append('circle')
      .classed('node', true)
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; })
      .attr('r', d => d.data.count === 'variable' ? 47.5 : 50)
      .style('stroke-width', 2);
    
    
    d3.select('svg g.links')
      .selectAll('.link')
      .data(root.links())
      .enter()
      .insert('line')
      .classed('link', true)
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    d3.selectAll('circle')
      .style('fill', (d) => {
        if (d.data.stateful) return '#F6E2B7';
        return '#F7F5F4';
      })
      .style('stroke', (d) => {
        if (d.data.stateful) return '#EEC25D';
        return '#CDC5C1';
      })
      .on('click', setViewingNode)
    
    d3.selectAll('g.node')
      .append('text')
      .text(d => d.data.name)
      .attr('width', '10px')
      .classed('stateful', d => d.data.stateful)
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('dy', '6px')
    
    d3.selectAll('g.node')
      .filter(d => d.data.count === 'variable')
      .insert('circle', 'circle')
      .style('fill', '#FAF9F9')
      .style('stroke', '#E5E1DF')
      .style('stroke-width', 2)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 52.5)
    
    d3.selectAll('g.node')
      .filter(d => d.data.count === 'variable')
      .insert('circle', 'circle')
      .style('fill', '#FDFDFD')
      .style('stroke', '#F2F0EF')
      .style('stroke-width', 2)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 57.5);

    return (
       <ProjectPage>
        <ProjectTitle>Project: {project_id}</ProjectTitle>
        <BodyOfProject>
            <Canvas id="content">
              <svg width="850" height="1000">
              <g transform="translate(60, 60)">
                <g class="links"></g>
                <g class="nodes"></g>
              </g>
            </svg>
            </Canvas>
            <Panel addNewNode={addNewNode} onInputChangeState={onInputChangeState} onInputChangeProps={onInputChangeProps} onInputChangeCount={onInputChangeCount} onInputChangeName={onInputChangeName} saveProject={updateNode} currentNode={currentNode} />
        </BodyOfProject>
      </ProjectPage>
    )
}

export default ProjectCanvas;


//These are the styled components 
const Canvas = styled.div`
    width: 80%;
    background-color: #f8f9fb;
` 

const BodyOfProject = styled.div`
    display: flex;
    justify-content: space-around;
    align-content: flex-start;
    width: 90%;
    margin: 30px;
    border: 1px solid #283044;
    border-radius: 3px;
    box-shadow: 2px 2px 3px #283044;
`

const ProjectTitle = styled.h1`
  margin: 20px 0px;
  padding: 10px 10px;
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  border-bottom: 1px solid grey;
`

const Node = styled.button`
  padding: 20px;
  border-radius: 100px;
  width: 100px;
  font-family: 'Poppins', sans-serif;
  :focus {
    outline: none; 
  }
`

const AddNode = styled.button`
  font-family: 'Raleway', sans-serif;
  background-color: transparent;
  border: none;
  :focus {
    outline: none; 
  }
  :hover {
    font-weight: bold;
    color: #680E4B;
  }
`

const NodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
`

const ProjectPage = styled.div`
    padding: 0px 40px;
`