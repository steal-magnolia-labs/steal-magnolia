import styled from 'styled-components';

const ProjectCardComponent = styled.button`
width: 200px;
height: 200px;
background-color: #336e7b;
border-radius: 50%;
color: white;
font-family: 'Raleway', sans-serif;
transition: 0.3s;
font-size: 20px;

:focus {
  outline: none;
}

:hover {
  box-shadow:  0px 3px 5px #black;
  background-color: #731A4B;
  font-weight: bold;
  cursor: pointer;
}
`;

export default ProjectCardComponent;
