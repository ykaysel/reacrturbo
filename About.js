import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";


export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("About mounted");
  });
  return (
    <div className="container">
      <a
        className="back"
        onClick={() => {
          navigate("/home");
        }}
      >
        Go Back
      </a>
      <section>
        <h1 className="title">About</h1>
      </section>
      <section>
        <p className="page">
          A cocktail is a mixed drink, usually alcoholic. Most commonly, a
          cocktail is a combination of one or more spirits mixed with other
          ingredients, such as juices, flavored syrups, tonic water, shrubs, and
          bitters. Most commonly, a cocktail is a combination of one or more
          spirits mixed with other ingredients, such as juices, flavored syrups,
          tonic water, shrubs, and bitters. Most commonly, a cocktail is a
          combination of one or more spirits mixed with other ingredients, such
          as juices, flavored syrups, tonic water, shrubs, and bitters. Most
          commonly, a cocktail is a combination of one or more spirits mixed
          with other ingredients, such as juices, flavored syrups, tonic water,
          shrubs, and bitters.{" "}
        </p>
      </section>
    </div>
  );
}