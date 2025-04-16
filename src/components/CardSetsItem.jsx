import CardList from "./CardItem";

export default function CardSetsItem({ cardSets, onSelect }) {
  return (
    <ul className="cardset-list">
      {cardSets.map((set) => (
        <li key={set.id}>
          <span>{set.title}</span>
          <button className="view-set-btn btn" onClick={() => onSelect(set.id)}>
            View
          </button>
        </li>
      ))}
    </ul>
  );
}
