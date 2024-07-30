import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { Menu, Plus, Trash } from "../components/Icons";
import useLocalStorage from "../hooks/useLocalStorage";

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
  const [cards, setCards] = useLocalStorage<CardPosition[]>("cards", []);
  const [dropdownVisible, setDropdownVisible] = useState<boolean[]>([]);
  const maxChars = 185;
  const [cardCounts, setCardCounts] = useState<number[]>(() => {
    return cards.map((card) => maxChars - (card.note || "").length);
  });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const formatDate = (date: Date): string => {
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

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

        card.style.top = `${card.offsetTop - newY}px`;
        card.style.left = `${card.offsetLeft - newX}px`;
      };

      const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const updatedCards = [...cards];
        updatedCards[index] = {
          ...updatedCards[index],
          top: card.offsetTop,
          left: card.offsetLeft,
        };
        setCards(updatedCards);
      };

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const addCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      {
        id: Date.now(),
        top: 0,
        left: 0,
        title: "",
        note: "",
        dateTime: formatDate(new Date()),
        characters: maxChars,
      },
    ]);
    setCardCounts((prevCounts) => [...prevCounts, maxChars]);
    setDropdownVisible((prevVisible) => [...prevVisible, false]);
  };

  const handleSave = (index: number) => () => {
    const updatedCards = [...cards];
    const cardRef = cardRefs.current[index];

    if (cardRef) {
      const title = cardRef.querySelector("input")?.value || "";
      const note = cardRef.querySelector("textarea")?.value || "";
      updatedCards[index] = {
        ...updatedCards[index],
        title,
        note,
        characters: cardCounts[index],
        dateTime: formatDate(new Date()),
      };
      setCards(updatedCards);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newCounts = [...cardCounts];
    newCounts[index] = maxChars - event.target.value.length;
    setCardCounts(newCounts);
  };

  const toggleDropdown = (index: number) => {
    setDropdownVisible((prevVisible) => {
      const newVisible = [...prevVisible];
      newVisible[index] = !newVisible[index];
      return newVisible;
    });
  };

  const deleteCard = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
    setDropdownVisible((prevVisible) =>
      prevVisible.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      {cards.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[index] = el)}
          onMouseDown={handleMouseDown(index)}
          className="w-[22vw] bg-[#F7F9FB] dark:bg-[#272727] border rounded absolute cursor-pointer"
          style={{ top: `${card.top}px`, left: `${card.left}px` }}
        >
          <header className="bg-accent-main h-10 flex justify-end pr-2">
            <button
              className="w-[10%] my-auto text-white"
              onClick={() => toggleDropdown(index)}
            >
              <Menu />
            </button>
            {dropdownVisible[index] && (
              <div className="absolute top-10 right-0 rounded shadow-lg p-2">
                <button
                  className="text-accent-failed size-6 hover:animate-bounce"
                  onClick={() => deleteCard(index)}
                >
                  <Trash />
                </button>
              </div>
            )}
          </header>
          <div className="p-5">
            <span className="text-[#BDC3C8] font-medium text-sm">
              {card.dateTime}
            </span>
            <input
              type="text"
              className="resize-none bg-transparent w-full py-2 outline-none font-bold text-lg text-[#272E40]"
              placeholder="Title"
              defaultValue={card.title}
              onBlur={handleSave(index)}
              autoFocus
            />
            <textarea
              className="resize-none w-full bg-transparent min-h-[150px] outline-none font-medium text-[#9FA1A2]"
              placeholder="note..."
              defaultValue={card.note}
              onBlur={handleSave(index)}
              onChange={(e) => handleChange(e, index)}
              maxLength={maxChars}
            ></textarea>
            <span className="text-[#BDC3C8] text-xs font-medium">
              {cardCounts[index]} chars left
            </span>
          </div>
        </div>
      ))}
      <button
        onClick={addCard}
        className="fixed right-5 top-1/2 -translate-y-1/2 bg-black text-white rounded-full w-[8vh]"
      >
        <Plus />
      </button>
    </>
  );
};

export default StickyNotes;
