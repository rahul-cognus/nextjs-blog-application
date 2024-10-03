"use client";
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { IoCheckmarkOutline, IoClose } from "react-icons/io5";

const MultiselectSearch = ({ array }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selection) => selection !== item));
    }
  };

  const handleDeleteSelection = (item) => {
    setSelectedItems(selectedItems.filter((selection) => selection !== item));
  };

  return (
    <div>
      <Autocomplete className="w-96" selectedKey={""}>
        {array.map((item, index) => (
          <AutocompleteItem
            key={index}
            value={item}
            onClick={() => handleSelect(item)}
            endContent={
              selectedItems.includes(item) && (
                <IoCheckmarkOutline className="mr-2 text-green-500" />
              )
            }
          >
            {item}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <div className="flex mt-2 w-96 flex-wrap">
        {selectedItems.map((item) => (
          <Chip
            key={item}
            color={"primary"}
            className="mr-2 mt-2"
            endContent={
              <IoClose
                className="mr-1 cursor-pointer"
                onClick={() => handleDeleteSelection(item)}
              />
            }
          >
            {item}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default MultiselectSearch;
