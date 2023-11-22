import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { fieldofstudy } from "../utils/fieldofstudyList.js";
import { educationalLevelList } from "../utils/educationLevelList.js";
import { profession } from "../utils/profession.js";
import clsx from "clsx";

const Selector = ({ ListType, handleClick }) => {
  const [open, setopen] = useState(false);
  const [list, setList] = useState({});
  const [selected, setSelected] = useState("");
  const [input, setInputValue] = useState("");

  useEffect(() => {
    if (ListType == "FieldOfStudy") {
      setList(fieldofstudy);
    } else if (ListType == "EducationalLevel") {
      setList(educationalLevelList);
    }
  }, [list]);

  return (
    <div className="p-2 flex flex-col bg-white w-1/2 mt-4 rounded gap-2 relative ">
      <div
        onClick={() => {
          setopen(!open);
        }}
        className={clsx("flex  items-center justify-between")}
      >
        <h1>
          {selected === ""
            ? ListType == "FieldOfStudy"
              ? "Select Field of Study "
              : "Select Highest Educational Level"
            : selected}
        </h1>
        <BiChevronDown className={clsx(open && "rotate-180")} />
      </div>

      {open && (
        <div
          className="flex flex-col gap-2 mt-7 w-full absolute z-10 bg-white -ml-2 px-2"
          onMouseLeave={() => {
            setopen(false);
          }}
        >
          <div className="flex relative">
            <input
              type="text"
              className="p-2 border-2 border-gray-200 w-full hover:border-gray-400 hover:shadow"
              onChange={(e) => {
                setInputValue(e.target.value);
                console.log(input);
              }}
            ></input>
            <AiOutlineSearch className="absolute top-3 right-2 h-6 w-6" />
          </div>

          <div className="h-32 overflow-y-auto">
            <ul className="">
              {list.map((item, index) => (
                <li
                  value={item}
                  key={index}
                  className={clsx(
                    "hover:bg-black hover:text-white p-1",
                    selected == item && "bg-black text-white",
                    item.toLowerCase().startsWith(input.toLowerCase())
                      ? ""
                      : "hidden"
                  )}
                  onClick={() => {
                    setSelected(item);
                    handleClick(item, ListType);
                    setopen(false);
                    console.log("selected" + selected + item.toLowerCase());
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Selector;
