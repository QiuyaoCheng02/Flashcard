import CardSetsItem from "../components/CardSetsItem";
import { useState } from "react";

export default function CardSetPage({ cardSets, isPending, onSelectSet }) {
  return (
    <div className="cardset-page">
      <h2>My Card Sets</h2>
      {isPending ? (
        <p>Loading card sets...</p>
      ) : (
        <CardSetsItem cardSets={cardSets} onSelect={onSelectSet} />
      )}
    </div>
  );
}
