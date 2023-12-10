import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";
import FetchData from "../components/common/FetchData";
import React, { Component, useState, useEffect, useContext } from "react";
import { UserContext } from "../state-management/contexts/UserContext";

function BrowsePage() {
  const [fetchedData, setData] = useState<ListingCardData[]>([]);
  //const { isLoggedIn, role } = useContext(UserContext);

  /*const dummyData: ListingCardData[] = [
    {
      _id: "123",
      postedBy: "6549cf50a4c97802fed8ccd1",
      title: "New Accommodation available",
      apartmentNumber: "1122",
      address: "Post Office Street",
      city: "Frisco",
      state: "TX",
      zipcode: 75080,
      bedrooms: 1,
      bathrooms: 1,
      monthlyRent: 950,
      utilitiesAmt: 50,
      listingType: "Permanent",
      startDate: "12-01-2023",
      endDate: "08-01-2024",
    },
  ];*/

  useEffect(() => {
    FetchData("http://localhost:3000/listings").then(([data]) => {
      setData(data);
      console.log(fetchedData);
    });
  }, []);

  return <ListingCardGrid dataList={fetchedData} />;
}

export default BrowsePage;
