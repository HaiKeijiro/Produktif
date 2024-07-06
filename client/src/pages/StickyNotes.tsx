import React, { useState, useRef, useEffect } from "react";

// Components
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

interface CardPosition {
  id: number;
  top: number;
  left: number;
}

const StickyNotes: React.FC = () => {
  const [cards, setCards] = useState<CardPosition[]>(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleMouseDown = (index: number) => (event: React.MouseEvent) => {
    const card = cardRefs.current[index];
    if (card) {
      let newX = 0,
        newY = 0,
        startX = event.clientX,
        startY = event.clientY;

      const mouseMove = (event: MouseEvent) => {
        newX = startX - event.clientX;
        newY = startY - event.clientY;

        startX = event.clientX;
        startY = event.clientY;

        if (card) {
          card.style.top = `${card.offsetTop - newY}px`;
          card.style.left = `${card.offsetLeft - newX}px`;
        }
      };

      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        if (card) {
          const updatedCards = [...cards];
          updatedCards[index] = {
            id: cards[index].id,
            top: card.offsetTop,
            left: card.offsetLeft,
          };
          setCards(updatedCards);
        }
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const addCard = () => {
    setCards([...cards, { id: Date.now(), top: 0, left: 0 }]);
  };

  return (
    <div className="w-screen h-screen bg-background-light flex">
      <Sidebar />
      <div className="w-full">
        <Topbar />
        <div
          id="container"
          className="relative bg-background-light"
          // style={{
          //   backgroundColor: "#212228",
          //   backgroundImage:
          //     "linear-gradient(#292a30 0.1em, transparent 0.1em), linear-gradient(90deg, #292a30 0.1em, transparent 0.1em)",
          //   backgroundSize: "4em 4em",
          // }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseDown={handleMouseDown(index)}
              className="w-[300px] h-fit bg-white rounded absolute"
              style={{ top: `${card.top}px`, left: `${card.left}px` }}
            >
              <header className="w-full bg-yellow-500 h-[40px] cursor-pointer"></header>
              <textarea className="resize-none bg-transparent w-full min-h-[200px] p-2 outline-none">
                holla
              </textarea>
            </div>
          ))}
          <button
            onClick={addCard}
            className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyNotes;
