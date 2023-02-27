import React, { useState } from "react";
import {Button,Box} from "@chakra-ui/react"

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  const handleClick = (number) => {
    console.log(number)
    paginate(number);
    setActivePage(number);
  };

  return (
    <Box m={"auto"} textAlign={"center"} py={3}>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          colorScheme={number == activePage ? "blue" : "gray"}
          isDisabled={number == activePage ? true : false}
          onClick={() => handleClick(number)}
        >
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
