import React from 'react'

const Profile = ({personDetails, personImages}) => {
     const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/h632/";
    return (
      <header className="flex flex-col md:flex-row items-center md:justify-center container pt-20 px-12 ">
        <img
          className="w-80 rounded-md border-2 border-gray-800"
          src={IMAGE_BASE_URL + personDetails.profile_path}
          alt={personDetails.name}
        />
        <article className="flex flex-col flex-wrap m-4 w-3/4 text-left ">
          <h1 className="text-white text-5xl pb-2">{personDetails.name}</h1>
          <p className="text-white whitespace-pre-line max-h-64  overflow-auto sc2 bg-gray-900 rounded p-3">
            {personDetails.biography}
          </p>
          <p className="text-white pt-6 "> </p>

          {/* IMAGES */}

          <div className="flex flex-row mx-2 sc2 p-2 rounded overflow-x-auto justify-left box-border bg-gray-900 bg-opacity-50  ">
            {personImages.slice(1, 100).map((image) => {
              return (
                <img
                  className="w-32"
                  src={IMAGE_BASE_URL + image.file_path}
                  alt=""
                />
              );
            })}
          </div>
        </article>
      </header>
    );
}

export default Profile
