import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const ProjectCards = ({ addNewProject }) => {

  //This state tracks what current project the user is viewing
  const [projectID, setProjectID] = useState({
      project_id: null,
      redirect: false
  });
  //This state tracks the list of project IDs and names
  const [allProjects, setAllProjects] = useState([]);


  //This function will fetch all the current projects (after render)
  //The response will be ID list of projects and their names
  useEffect(() => {

    const metaData = {
        'method': 'GET',
        'Content-type': 'application/json'
    }

    fetch('/getallprojects', metaData)
        .then(response => response.json())
        .then(response => setAllProjects(response))
        .catch(err => console.log('error in getting the projects', err))

   }, []);
    
  const renderRedirect = () => {
    if(projectID.redirect){
      return <Redirect to={{
        pathname: `/project/${projectID.project_id}`,
        project: projectID
      }}/>;
    }
  }

  //This function gets a list of all the current projects and puts them into an array of dropdown options
  const listOfProjects = allProjects.map(project => {
    return <Project onClick={(e) => setProjectID({ project_id: e.target.value, redirect: true })} value={project.project_id}>{project.project_name}</Project>
  });

  return (
    <ProjectSection>
      {renderRedirect()}
      <ProjectTitle>
        My projects:
        <NewProjectBtn onClick={addNewProject}>Start New Project</NewProjectBtn>
      </ProjectTitle>
      <ProjectList>
        {listOfProjects}
      </ProjectList>
    </ProjectSection>
  ); // end of return
}

export default ProjectCards;

const Project = styled.button`
    width: 200px;
    padding: 50px 10px 50px 10px;
    background-color: #336e7b;
    border-radius: 1px;
    color: white;
    font-family: 'Raleway', sans-serif;
    transition: 0.3s;
    font-size: 20px;

    :focus {
        outline: none;
    }

    :hover {
      box-shadow: 1px 2px 10px grey;
      font-weight: bold;
    }
`

const ProjectSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
`

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 20px;
  width: 80%;

`

const ProjectTitle = styled.div`
  margin: 20px 0px;
  padding: 10px 10px;
  font-family: 'Raleway', sans-serif;
  display: flex;
  font-size: 30px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`

const NewProjectBtn = styled.button`
    font-family: 'Raleway', sans-serif;
    padding: 10px;
    border-radius: 3px;
    margin-left: 20px;
    display: flex;
    justify-content: flex-end;
    border: 1px solid #680E4B;
    transition: 0.3s;
    background-color: #680E4B;
    color: white;

    :focus {
        outline: none;
    }

    :hover {
      box-shadow: 1px 2px 10px grey;
      font-weight: bold;
    }
`