import React from "react";

const PeoplePopular = ({ peopleList }) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
  return (
    <section className="my-20">
      <h1 className="text-gray-400 text-3xl ml-8 mb-4">Trending People</h1>
      <div className="grid grid-flow-col mx-2 sc1 auto-cols-max overflow-x-auto justify-left box-border bg-gray-900 bg-opacity-50 rounded-2xl">
        {peopleList.map((person) => {
          if (person.profile_path) {
            return (
              <a
                href={`people/${person.id}`}
                className="m-4 w-32 md:w-56 shadow-2xl transform hover:scale-105 transition-all duration-500"
              >
                <img
                  src={IMAGE_BASE_URL + person.profile_path}
                  className="rounded-t-lg "
                  alt={person.name}
                  key={person.id}
                ></img>
                <caption className="p-3 w-32 md:w-56 text-center  text-gray-400 tracking-wide truncate rounded-b bg-gray-900">
                  <strong>{person.name}</strong>
                  <br />
                  {person.known_for
                    .map((a) => (a.title ? a.title : a.name))
                    .join(", ")}
                </caption>
              </a>
            );
          }
        })}
      </div>
    </section>
  );
};

export default PeoplePopular;
