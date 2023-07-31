import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';

const FormField = ({ controlId, label, type, placeholder, value, onChange, readOnly }) => (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </Form.Group>
  );
  

export default FormField