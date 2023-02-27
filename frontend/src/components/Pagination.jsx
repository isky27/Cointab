import React, { useState } from "react";
import {Button,Box} from "@chakra-ui/react"

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [activePage, setActivePage] = useState(1);

  const handleClick = (number) => {
    paginate(number);
    setActivePage(number);
  };

  const handleNext = ()=>{
    setActivePage(pre=>pre+1)
    paginate(activePage);
  }
    const handlePrev = () => {
    setActivePage((pre) => pre - 1);
    paginate(activePage);
    };
  return (
    <Box m={"auto"} textAlign={"center"} py={3}>
      <Button
        isDisabled={activePage == 1 ? true : false}
        onClick={handlePrev}
      >
        Prev
      </Button>
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
      <Button
        isDisabled={activePage == pageNumbers.length ? true : pageNumbers.length==0?true: false}
        onClick={handleNext}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
