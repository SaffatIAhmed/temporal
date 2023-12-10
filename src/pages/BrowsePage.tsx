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
      _id: "123",
      postedBy: "6549cf50a4c97802fed8ccd1",
      title: "New Accommodation available",
      apartmentNumber: "1122",
      address: "Post Office Street",
      city: "Frisco",
      state: "TX",
      zipcode: "75080",
      bedrooms: 1,
      bathrooms: 1,
      rent: 950,
      utilities: 50,
      pref_gender: 'Male',
      is_private_room: 'yes',
      move_in_date: "12-01-2023",
      move_out_date: "08-01-2024",
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
