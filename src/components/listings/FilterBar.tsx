import { Button, Form, FormLabel, Row } from "react-bootstrap";
import { ListingCardData } from "../../utils/Interfaces";
import { useState } from "react";

interface FilterBarProps {
  dataList: ListingCardData[];
}

function FilterBar(props: FilterBarProps) {
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [bedNum, setBedNum] = useState("");
  const [bathNum, setBathNum] = useState("");
  const [gender, setGender] = useState("");
  const [privateRoom, setPrivateRoom] = useState("");

  const submitFilters = () => {
    if(minRent != ""){
        console.log("Min Rent:", minRent);
    }
    if(maxRent != ""){
        console.log("Max Rent:", maxRent);
    }
    if(bedNum != ""){
        console.log("Min Rent:", bedNum);
    }
    if(bathNum != ""){
        console.log("Min Rent:", bathNum);
    }
    if(gender != ""){
        console.log("Min Rent:", gender);
    }
    if(privateRoom != ""){
        console.log("Min Rent:", privateRoom);
    }
  };

  return (
    <Row>
      <Form onSubmit={(e) => { e.preventDefault(); submitFilters(); }}>
        <Form.Group className="mb-3">
          <Form.Control
            type="MinRent"
            placeholder="Min. Rent"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="MaxRent"
            placeholder="Max. Rent"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="BedNum"
            placeholder="Bed No."
            value={bedNum}
            onChange={(e) => setBedNum(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="BathNum"
            placeholder="Bath No."
            value={bathNum}
            onChange={(e) => setBathNum(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <FormLabel>Preferred Gender</FormLabel>
          <Form.Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <FormLabel>Private Room</FormLabel>
          <Form.Select
            value={privateRoom}
            onChange={(e) => setPrivateRoom(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="female">Yes</option>
            <option value="male">No</option>
          </Form.Select>
          <Button variant="primary" type="submit">
            Filter
          </Button>
        </Form.Group>
      </Form>
    </Row>
  );
}

export default FilterBar;
