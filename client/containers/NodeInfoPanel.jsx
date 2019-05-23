import React from 'react';
import styled from 'styled-components';

const NodeInfoPanel = ({
  addNewNode,
  deleteNode,
  saveProject,
  currentNode,
  onInputChangeName,
  onInputChangeCount,
  onInputChangeProps,
  onInputChangeState,
}) => {
  const { count, name, id, parent_id, props, stateful } = currentNode;
  return (
    <RightPanel>
      <NodeInfo onSubmit={saveProject}>
        <TextField>
          <span>Component Name: </span>
          <input
            className="field"
            type="text"
            name="componentName"
            id={id}
            value={name}
            onChange={onInputChangeName}
          />
        </TextField>

        <label htmlFor="stateful">
          <input
            type="checkbox"
            name="stateful"
            value="stateful"
            onChange={onInputChangeState}
            defaultChecked={stateful}
          />
          <span>Stateful?</span>
        </label>
        <TextField>
          <span>How many components are there?:</span>
          <input
            className="field"
            type="text"
            name="componentCount"
            onChange={onInputChangeCount}
            defaultValue={count}
          />
        </TextField>

        <TextField>
          <span>Props:</span>
          <input
            className="field"
            type="text"
            name="props"
            onChange={onInputChangeProps}
            defaultValue={props}
          />
        </TextField>
        <UpdateBtn>Update Component</UpdateBtn>
      </NodeInfo>
      <AddNodeBtn value={id} onClick={addNewNode}>
        Add Child Node
      </AddNodeBtn>
      <DeleteNodeBtn value={id} onClick={deleteNode}>
        Delete Node
      </DeleteNodeBtn>
    </RightPanel>
  );
};

export default NodeInfoPanel;

const RightPanel = styled.div`
  width: 250px;
  min-height: 500px;
  font-size: 13px;
  border-left: 1px solid black;
  font-family: 'Raleway', sans-serif;
`;

const NodeInfo = styled.form`
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  padding: 10px;
`;

const AddNodeBtn = styled.button`
  border: 1px solid #680e4b;
  border-radius: 3px;
  padding: 10px;
  width: auto;
  color: #680e4b;
  transition: 0.3s;
  margin-top: 100px;
  margin-left: 50px;

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 1px 2px 10px grey;
  }
`;

const DeleteNodeBtn = styled.button`
  border: 1px solid #680e4b;
  border-radius: 3px;
  padding: 10px;
  width: auto;
  color: white;
  background-color: red;
  transition: 0.3s;
  margin-top: 25px;
  margin-left: 50px;

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 1px 2px 10px grey;
  }
`;

const UpdateBtn = styled.button`
  border: 1px solid #680e4b;
  border-radius: 3px;
  padding: 10px;
  width: auto;
  color: white;
  transition: 0.3s;
  margin-top: 15px;
  background-color: #680e4b;

  :focus {
    outline: none;
  }

  :hover {
    box-shadow: 1px 2px 10px grey;
  }
`;

const TextField = styled.label`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;
