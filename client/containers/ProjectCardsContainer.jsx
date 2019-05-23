import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ProjectCardComponent from './../components/ProjectCardComponent.jsx';
import NewProjectBtn from './../components/NewProjectBtn.jsx';

const ProjectCards = ({ addNewProject }) => {
  // This state tracks what current project the user is viewing
  const [projectID, setProjectID] = useState({
    project_id: null,
    redirect: false,
  });
  // This state tracks the list of project IDs and names
  const [allProjects, setAllProjects] = useState([]);
  const [googleRedirect, setGoogleRedirect] = useState(false);

  // This function will fetch all the current projects (after render)
  // The response will be ID list of projects and their names
  useEffect(() => {
    const metaData = {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
      },
    };
    console.log('about to!')

    fetch('/getallprojects', metaData)
      .then(response => {
        if (response.status === 403) setGoogleRedirect(true);
        return response.json()
      })
      .then(response => {
        setAllProjects(response)
      })
      .catch(err => console.log('error in getting the projects', err));
  }, []);

  const renderRedirect = () => {
    if (projectID.redirect) {
      return (
        <Redirect
          to={{
            pathname: `/project/${projectID.project_id}`,
            project: projectID,
          }}
        />
      );
    }
  };

  // This function gets a list of all the current projects and puts them into an array of dropdown options
  const listOfProjects = allProjects.map(project => (
    <ProjectCardComponent
      onClick={e =>
        setProjectID({ project_id: e.target.value, redirect: true })
      }
      value={project.project_id}
    >
      {project.project_name}
    </ProjectCardComponent>
  ));

  return (
    <ProjectSection>
      {renderRedirect()}
      {googleRedirect && <Redirect to="/google-init" />}
      <ProjectTitle >
        My projects:
        <NewProjectBtn onClick={addNewProject}> {' Start New Project '} </NewProjectBtn>
      </ProjectTitle>
      <ProjectList>{listOfProjects}</ProjectList>
    </ProjectSection>
  ); // end of return
};

export default ProjectCards;

const ProjectSection = styled.div`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;

`;

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: center;
  grid-gap: 30px;
`;

const ProjectTitle = styled.div`
  margin: 20px 0px;
  padding: 10px 10px;
  font-family: 'Raleway', sans-serif;
  display: flex;
  font-size: 30px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid grey;
`;
