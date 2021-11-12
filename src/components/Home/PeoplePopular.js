import { React, useRef } from "react";

const PeoplePopular = ({ peopleList }) => {
  const ref = useRef(null);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  return (
    <section className="my-20">
      <h1 className="text-gray-400 text-3xl ml-8 mb-2">Trending People</h1>
      <nav className="flex flex-row flex-nowrap items-center">
        <button
          className="text-gray-400 text-2xl bg-gray-400 bg-opacity-10 hover:bg-opacity-40 duration-200 px-3 transform z-40 rounded-l-lg h-32 hidden sm:block"
          onClick={() => scroll(-511)}
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <div
          ref={ref}
          className="grid grid-flow-col w-full sc1 auto-cols-max overflow-x-auto justify-left box-border  rounded-2xl"
        >
          {peopleList
            .filter((person) => person.profile_path)
            .map((person) => {
              return (
                <a
                  href={`people/${person.id}`}
                  className="m-4 w-32 md:w-56 shadow-2xl transform hover:scale-105 transition-all duration-500 poster"
                  key={person.id}
                >
                  <img
                    src={IMAGE_BASE_URL + person.profile_path}
                    className="rounded-t-lg  "
                    alt={person.name}
                    key={person.id}
                  ></img>
                  <div className="p-3 w-32 md:w-56 text-center  text-gray-400 tracking-wide truncate rounded-b bg-gray-900">
                    <strong>{person.name}</strong>
                    <br />
                    {person.known_for
                      .map((a) => (a.title ? a.title : a.name))
                      .join(", ")}
                  </div>
                </a>
              );
            })}
        </div>
        <button
          className="text-gray-400 text-2xl h-32 bg-gray-400 bg-opacity-10 hover:bg-opacity-40 duration-200 px-3 transform -translate-x-0 rounded-r-lg hidden sm:block "
          onClick={() => scroll(511)}
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </nav>
    </section>
  );
};

export default PeoplePopular;
