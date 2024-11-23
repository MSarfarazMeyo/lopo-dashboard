import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE } from "../utils/constants";

const HistoryContext = createContext<any>(null);

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem(
        LOCAL_STORAGE.navigationHistory
      );
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });

  useEffect(() => {
    if (pathname === "/" || pathname === "/dashboard") {
      setHistory([pathname]);
      localStorage.setItem(
        LOCAL_STORAGE.navigationHistory,
        JSON.stringify([pathname])
      );
      return;
    }

    setHistory((prevHistory) => {
      if (prevHistory[prevHistory.length - 1] !== pathname) {
        const updatedHistory = [...prevHistory, pathname];
        localStorage.setItem(
          LOCAL_STORAGE.navigationHistory,
          JSON.stringify(updatedHistory)
        );
        return updatedHistory;
      }
      return prevHistory;
    });
  }, [pathname]);

  const goBack = () => {
    const uniqueHistory = [...new Set(history)];
    if (uniqueHistory.length > 1) {
      const updatedHistory = [...uniqueHistory];
      updatedHistory.pop();
      const previousPage = updatedHistory.pop();
      setHistory(updatedHistory);
      localStorage.setItem(
        LOCAL_STORAGE.navigationHistory,
        JSON.stringify(updatedHistory)
      );
      navigate(previousPage || "/");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <HistoryContext.Provider value={{ goBack }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
