import React from 'react'

const SortBy = ({setFilter}) => {
    return (
      
        <div className="grid grid-rows-2 grid-cols-1 justify-items-end ">
          <div className="flex flex-row">
            <p className="text-gray-400 pr-2">Sort by:</p>
            <select
              onInput={(e) =>
                setFilter((previousState) => {
                  return { ...previousState, sortby: e.target.value, page: 1 };
                })
              }
              className="rounded bg-gray-900 text-gray-400"
            >
              <option value="primary_release_date">Release Date</option>
              <option value="vote_average">Rating</option>
              <option value="revenue">Revenue</option>
              <option value="vote_count">Vote Count</option>
            </select>
          </div>
          <form
            onChange={(e) =>
              setFilter((previousState) => {
                return { ...previousState, direction: e.target.id, page: 1 };
              })
            }
            className="text-gray-400"
          >
            <input className="bg-gray-900" type="radio" name="sortby" id="desc" defaultChecked />
            <label className="px-2 " htmlFor="desc">
              desc
            </label>
            <input type="radio" name="sortby" id="asc" />
            <label className="px-2" htmlFor="asc">
              asc
            </label>
          </form>
        </div>
    );
}

export default SortBy
