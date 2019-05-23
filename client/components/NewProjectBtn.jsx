import styled from 'styled-components';

const NewProjectBtn = styled.button`
  font-family: 'Raleway', sans-serif;
  padding: 10px;
  border-radius: 3px;
  margin-left: 20px;
  display: flex;
  justify-content: flex-end;
  border: 1px solid #680e4b;
  transition: 0.3s;
  background-color: #680e4b;
  color: white;

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 1px 2px 10px grey;
    font-weight: bold;
  }
`;

export default NewProjectBtn;
