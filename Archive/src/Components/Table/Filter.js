import React from 'react';
import { Form } from 'react-bootstrap';
const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <Form className="w-100">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          value={filter}
          placeholder="Search..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default GlobalFilter;
