import { Row, Col, Placeholder, Card } from "react-bootstrap";
import { CartFill, Star, PencilSquare, Trash3 } from "react-bootstrap-icons";
import { ListingCardData } from "../../utils/Interfaces";
import { useState } from "react";
import ListingCardModal from "./ListingCardModal";
import CheckoutModal from "./CheckoutModal";
import IconButton from "../base/IconButton";
import ThemeButton from "../base/ThemedButton";
import DeleteModel from "./DeleteModal";
import CreateListingModal from "./CreateListingModal";

interface ListingCardProps {
  data: ListingCardData;
}

function ListingCard({ data: props }: ListingCardProps) {
  const [imgLoading, setImgLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateListingModelOpen, setCreateListingModalOpen] = useState(false);
  //const picID = Number(props._id.substring(0,2));
  const picID = props.monthlyRent % 1000;

  return (
    <>
      <Card
        style={{ width: 360, cursor: "pointer" }}
        onClick={() => setIsModalOpen(true)}
      >
        <Card.Img
          variant="top"
          src={`https://picsum.photos/id/${picID}/360/240`}
          onLoad={() => setImgLoading(false)}
        />
        {imgLoading && (
          <Placeholder as={Card.Img} style={{ width: 358, height: 239 }} />
        )}
        <Card.Body>
          <Row>
            <Col sm={10}>
              <div
                style={{
                  color: "#154734",
                  fontWeight: "bold",
                }}
              >
                {props.address}
              </div>
              <div>
                {props.address + " • " + props.city + ", " + props.state}
              </div>
              <div>
                <b>${props.monthlyRent}</b> • Available Now
              </div>
            </Col>
            <Col sm={2} style={{ cursor: "default" }}>
              <IconButton
                icon={<Star size={24} />}
                onClick={function (): {} {
                  throw new Error("Function not implemented.");
                }}
              />
              <IconButton
                icon={<CartFill size={24} />}
                onClick={() => {
                  setIsCheckoutModalOpen(true);
                  return {};
                }}
              />
            </Col>
          </Row>
          <Row>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 32,
                alignContent: "center",
              }}
            >
              <ThemeButton
                icon={<PencilSquare size={24} />}
                onClick={function (): {} {
                  setCreateListingModalOpen(true);
                  return {};
                }}
              >
                Edit
              </ThemeButton>
              <ThemeButton
                icon={<Trash3 size={24} />}
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  return {};
                }}
              >
                Delete
              </ThemeButton>
            </div>
          </Row>
        </Card.Body>
      </Card>

      <ListingCardModal
        data={props}
        showModal={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <CheckoutModal
        data={props}
        showModal={isCheckoutModalOpen}
        handleClose={() => setIsCheckoutModalOpen(false)}
      />
      <DeleteModel
        data={props}
        showModal={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
      />
      <CreateListingModal 
        data={props}
        showModal={isCreateListingModelOpen}
        handleClose={() => setCreateListingModalOpen(false)}
      />
    </>
  );
}

export default ListingCard;
