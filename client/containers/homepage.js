import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ProjectCards from './projectcards.js';

const Homepage = () => {

    //This state tracks what current project the user is viewing
    const [projectID, setProjectID] = useState(null);
    //This state tracks if the page should be redirected
    const [redirect, setRedirect] = useState(false);
    
    //This function will redirect the user to the correct page with the project ID
    const renderRedirect = () => {
        if(projectID){
            return <Redirect to={{
                pathname: `/project/${projectID}`,
                project: projectID
            }}/>;
        }
    }

    //This function adds a new project to the data base
    //The response is a single project ID
    const addNewProject = () => {
        
        const metaData = {
            'method': 'POST',
            'Content-type': 'application/json',
        }

        fetch('/newproject', metaData)
            .then(response => response.json())
            .then(response => setProjectID(response.project_id)) //The returned project ID 
            .catch(err => console.log('err', err))  
    }  

    return (
      <React.Fragment>
        {renderRedirect()}
        <ProjectCards addNewProject={addNewProject}/>
      </React.Fragment>
    )
}

export default Homepage;

