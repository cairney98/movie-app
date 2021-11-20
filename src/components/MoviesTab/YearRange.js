import React from "react";

const YearRange = ({setFilter}) => {
  return (
    <div className="grid grid-cols-2 pr-6 gap-y-2">
      <label className="justify-self-end pr-2 text-gray-400" htmlFor="minyear">
        from
      </label>
      <input
        onChange={(e) =>
          setFilter((previousState) => {
            return { ...previousState, minyear: e.target.value, page: 1 };
          })
        }
        className="w-16 rounded bg-gray-900 text-gray-400 p-0.5"
        type="number"
        defaultValue="1950"
        min="1888"
        max="2021"
        id="minyear"
      />
      <label className="justify-self-end pr-2 text-gray-400" htmlFor="maxyear">
        to
      </label>
      <input
        onChange={(e) =>
          setFilter((previousState) => {
            return { ...previousState, maxyear: e.target.value, page: 1 };
          })
        }
        className="w-16 p-0.5 rounded bg-gray-900 text-gray-400"
        type="number"
        defaultValue="2021"
        min="1888"
        max="2021"
        id="maxyear"
      />
    </div>
  );
};

export default YearRange;
