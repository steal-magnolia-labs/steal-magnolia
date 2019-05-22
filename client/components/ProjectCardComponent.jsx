import styled from 'styled-components';

const ProjectCardComponent = styled.button`
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
`;

export default ProjectCardComponent;
