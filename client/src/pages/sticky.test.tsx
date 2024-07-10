import React, { useState, useRef, useEffect } from "react";

// Components
import Sidebar from "../layout/Sidebar";
import Topbar from "../components/Topbar";
import { Plus } from "../components/Icons";

interface CardPosition {
  id: number;
  top: number;
  left: number;
  title: string;
  note: string;
  dateTime: string;
  characters?: number;
}

const StickyNotes: React.FC = () => {
  const [cards, setCards] = useState<CardPosition[]>(() => {
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const [count, setCount] = useState(0);
  const maxChars = 185;
  
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
            ...updatedCards[index],
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

  // Date
  const today = new Date();
  const gmtDate = `${today.getUTCDate()}/${
    today.getUTCMonth() + 1
  }/${today.getUTCFullYear()}`;

  const addCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      {
        id: Date.now(),
        top: 0,
        left: 0,
        title: "",
        note: "",
        dateTime: gmtDate,
        characters: maxChars - count,
      },
    ]);
  };

  const handleSave =
    (index: number) => (event: React.FocusEvent | React.KeyboardEvent) => {
      const updatedCards = [...cards];
      updatedCards[index] = {
        ...updatedCards[index],
        dateTime: gmtDate,
        title: cardRefs.current[index]?.querySelector("input")?.value || "",
        note: cardRefs.current[index]?.querySelector("textarea")?.value || "",
        characters: maxChars - count,
      };
      setCards(updatedCards);
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
              className="w-[300px] h-fit bg-white rounded absolute cursor-pointer"
              style={{ top: `${card.top}px`, left: `${card.left}px` }}
            >
              <header className="bg-yellow-500 h-10"></header>
              <div className="p-5">
                <span className="text-[#BDC3C8] font-medium text-sm">
                  {card.dateTime}
                </span>
                <input
                  type="text"
                  className="resize-none bg-transparent w-full pt-3 py-2 outline-none font-bold text-lg text-[#272E40]"
                  placeholder="Title"
                  defaultValue={card.title}
                  onBlur={handleSave(index)}
                  onKeyDown={(event) => {
                    handleSave(index)(event);
                  }}
                />
                <textarea
                  className="resize-none w-full min-h-[150px] outline-none font-medium text-[#A5A8AF]"
                  placeholder="note..."
                  defaultValue={card.note}
                  onBlur={handleSave(index)}
                  onKeyDown={(event) => {
                    handleSave(index)(event);
                  }}
                  onChange={(e) => setCount(e.target.value.length)}
                  maxLength={maxChars}
                ></textarea>
                <span className="float-end" defaultValue={card.characters}>
                  {count > 0 ? `${maxChars - count} chars left` : null}
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={addCard}
            className="fixed right-5 top-1/2 -translate-y-1/2 bg-button-light text-white rounded-full w-[8vh]"
          >
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyNotes;
