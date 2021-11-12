import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPersonRequest } from "../../API";
import Profile from "./Profile";
import PersonCredits from "./PersonCredits";

const Person = () => {
  const [loading, setLoading] = useState(false);
  const [personDetails, setPersonDetails] = useState({});
  const [personImages, setPersonImages] = useState([]);
  const [personCredits, setPersonCredits] = useState([]);
  const [jobFilter, setJobFilter] = useState("All");

  const { personId } = useParams();

  const getPersonDetails = async (personId) => {
    setLoading(true);
    const personResponse = await getPersonRequest(personId);
    setPersonDetails(personResponse);
    setLoading(false);
  };
  const getPersonImages = async (personId) => {
    const imagesResponse = await getPersonRequest(personId, "/images");
    setPersonImages(imagesResponse.profiles);
  };
  const getPersonCredits = async (personId) => {
    const creditsResponse = await getPersonRequest(personId, "/credits");
    setPersonCredits(creditsResponse.crew.concat(creditsResponse.cast));
  };

  useEffect(() => {
    getPersonDetails(personId);
    getPersonImages(personId);
    getPersonCredits(personId);
  }, [personId]);

  if (loading) {
    return (
      <h2 className="text-gray-400 text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2">
        Loading...
      </h2>
    );
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <Profile personDetails={personDetails} personImages={personImages} />

      <PersonCredits
        personCredits={personCredits}
        jobFilter={jobFilter}
        setJobFilter={setJobFilter}
      />
    </main>
  );
};

export default Person;
