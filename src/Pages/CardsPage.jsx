import CardItem from "../components/CardItem";
export default function CardsPage({ cards, title, onPractice }) {
  return (
    <div className="Cards-list">
      <h2>Cards in {title}</h2>
      <CardItem cards={cards} />
      <button onClick={onPractice}>Start Practice</button>
    </div>
  );
}
