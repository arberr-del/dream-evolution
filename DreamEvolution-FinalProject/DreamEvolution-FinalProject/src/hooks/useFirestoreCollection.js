import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

const PLACEHOLDER_EVENTS = [
  {
    id: "1",
    title: "Уметничка Изложба",
    description:
      "Годишна изложба на современа уметност со учество на над 50 уметници.",
    date: "15 Јун 2026",
    imageUrl: "",
  },
  {
    id: "2",
    title: "Графити Фестивал",
    description:
      "Меѓународен фестивал на уличната уметност во срцето на градот.",
    date: "22 Јун 2026",
    imageUrl: "",
  },
  {
    id: "3",
    title: "Арт Работилница",
    description:
      "Интерактивна работилница за сите возрасти, водена од познати уметници.",
    date: "30 Јун 2026",
    imageUrl: "",
  },
];

const PLACEHOLDER_ARTISTS = [
  { id: "1", name: "Стефан Несторовски", imageUrl: "" },
  { id: "2", name: "Катерина Стојановска", imageUrl: "" },
  { id: "3", name: "Валентин Петровски", imageUrl: "" },
  { id: "4", name: "Марија Илиевска", imageUrl: "" },
];

export function useFirestoreCollection(collectionName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingPlaceholder, setUsingPlaceholder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setData(items);
      } catch {
        setUsingPlaceholder(true);
        setData(
          collectionName === "events"
            ? PLACEHOLDER_EVENTS
            : PLACEHOLDER_ARTISTS,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, setData, usingPlaceholder };
}
