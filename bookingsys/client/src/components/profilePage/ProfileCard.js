import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileCard = ({ title, imageSrc, description, buttonText, buttonLink }) => (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={buttonLink}>
          <Button variant="primary">{buttonText}</Button>
        </Link>
      </Card.Body>
    </Card>
  );

export default ProfileCard