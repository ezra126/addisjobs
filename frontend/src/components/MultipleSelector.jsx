import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { CiCircleRemove } from "react-icons/ci";
import clsx from "clsx";
import { profession } from "../utils/profession.js";
import { getAdditionalUserInfo } from "firebase/auth";

const MultipleSelector = ({ handleClick, handleCancelClick }) => {
  const [input, setInputValue] = useState("");
  const [open, setopen] = useState(false);
  const inputRef = useRef();
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    if (userInfo.experience?.profession?.length > 0) {
      setSelectedList(userInfo.experience?.profession);
    }
  }, []);

  return (
    <div
      className="flex flex-col bg-white border-2 w-3/4 p-1 "
      onMouseEnter={() => {
        inputRef.current.focus();
      }}
      onMouseLeave={() => {
        inputRef.current.blur();
        setopen(false);
      }}
    >
      <div
        onClick={() => {
          setopen(true);
          inputRef.current.focus();
        }}
        className="flex flex-row flex-wrap items-center gap-2 pb-1"
      >
        {selectedList.length > 0
          ? selectedList.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-200 py-1 px-2 rounded-lg"
              >
                <CiCircleRemove
                  onClick={() => {
                    setSelectedList(selectedList.filter((i) => i !== item));
                    handleCancelClick(item);
                  }}
                />
                {item}
              </div>
            ))
          : null}

        {/* {userInfo.experience.profession.length > 0
          ? userInfo.experience.profession.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-200 py-1 px-2 rounded-lg"
              >
                <CiCircleRemove
                  onClick={() => {
                    setSelectedList(selectedList.filter((i) => i !== item));
                    handleCancelClick(item);
                  }}
                />
                {item}
              </div>
            ))
          : null} */}
        <input
          type="text"
          ref={inputRef}
          onChange={(e) => {
            setInputValue(e.target.value);
            console.log(input);
          }}
          placeholder={
            selectedList.length > 0 ? "" : "Selected multiple option"
          }
          className="hover:border-0 ring-0 outline-none focus:hover:border-0 p-1 "
        ></input>
      </div>

      {open &&
        (selectedList.length > 2 ? (
          <div>You can only select 3 items</div>
        ) : (
          <div class="h-32 overflow-y-auto ">
            <ul>
              {profession.map((item, index) => (
                <li
                  key={index}
                  className={clsx(
                    "hover:bg-black hover:text-white p-1",
                    // selectedList.length > 0 &&
                    //   selectedList.includes(item) &&
                    //   "bg-black text-white",
                    item.toLowerCase().startsWith(input.toLowerCase())
                      ? ""
                      : "hidden"
                  )}
                  onClick={() => {
                    console.log(open);
                    setopen(false);
                    if (!selectedList.includes(item)) {
                      setSelectedList([...selectedList, item]);
                      handleClick(item);
                    }
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default MultipleSelector;
