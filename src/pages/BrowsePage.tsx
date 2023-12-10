import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";
import FetchData from "../components/common/FetchData";
import React, { Component, useState, useEffect, useContext } from "react";
import { UserContext } from "../state-management/contexts/UserContext";
import CreateListingModal from "../components/listings/CreateListingModal";

function BrowsePage() {
  const [fetchedData, setData] = useState<ListingCardData[]>([]);
  //const { isLoggedIn, role } = useContext(UserContext);

  const dummyData: ListingCardData[] = [
    {
      id: "1",
      posted_by: "1",
      suit_number: "68739",
      street: "526 Caliangt Way",
      neighborhood: "Bent Avens",
      city: "Van Nuys",
      state: "CA",
      zipcode: "91411",
      bedrooms: 3,
      bathrooms: 1,
      rent: 78,
      utilities: 26,
      pref_gender: "Female",
      is_private_room: "yes",
      move_in_date: "1/27/2024",
      move_out_date: "9/26/2024",
    },
  ];

  useEffect(() => {
    FetchData("http://localhost:3000/listings").then(([data]) => {
      setData(data);
      console.log(fetchedData);
    });
  }, []);

  return <ListingCardGrid dataList={dummyData} />;
}

export default BrowsePage;
