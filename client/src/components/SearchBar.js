import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({input,onChange}) => {
  
  return (
    <Form.Group>
        <Form.Control type="text" placeholder="Search" key="random1" value={input}  onChange={(e) => onChange(e.target.value)}/>
    </Form.Group>

  );
}

export default SearchBar;