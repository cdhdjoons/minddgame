// components/ClientOnlyWrapper.js (클라이언트 전용 컴포넌트)
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Footer from './footer';
import Script from 'next/script';


// Create context for ticket state
const TicketContext = createContext();
export const TICKETS_UPDATE_EVENT = 'ticketsUpdate';  // Export the event name instead


// Provider component
const TicketProvider = ({ children }) => {
  const [hasTickets, setHasTickets] = useState(false);

  const updateTicketState = () => {
    if (typeof window !== 'undefined') {  // Check if we're on client-side
      const tickets = localStorage.getItem('tickets');
      setHasTickets(tickets && parseInt(tickets) > 0);
    }
  };

  useEffect(() => {
    updateTicketState();
  }, []);

  useEffect(() => {
    // Listen for storage changes (other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'tickets') {
        updateTicketState();
      }
    };
    // Listen for same-tab updates
    const handleTicketsUpdate = () => {
      updateTicketState();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(TICKETS_UPDATE_EVENT, handleTicketsUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(TICKETS_UPDATE_EVENT, handleTicketsUpdate);
    };
  }, []);

  return (
    <TicketContext.Provider value={{ hasTickets, updateTicketState }}>
      {children}
    </TicketContext.Provider>
  );
};

// Export context so Footer can use it
export { TicketContext };

const ClientOnlyWrapper = () => {
  return (
    <TicketProvider>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="afterInteractive"
      />
      <Footer />
    </TicketProvider>
  );
};

export default ClientOnlyWrapper;



// import Script from 'next/script';
// import Footer from './footer';
// import { useEffect, useState } from 'react';

// const ClientOnlyWrapper = () => {
//   const [onGame, setOnGame] = useState(() => {
//     const storedTickets = Number(localStorage.getItem("tickets"));
//     return storedTickets >= 1; // 값이 1 이상이면 true, 아니면 false
//   });

//   // localStorage 값이 변경될 때 상태를 업데이트 (특정 키만 감지)
//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       // 특정 키가 변경되었을 때만 반영
//       if (event.key === "tickets") {
//         const storedValue = Number(event.newValue);
//         setOnGame(storedValue >= 1); // 값이 1 이상이면 true로 설정
//       }
//     };

//     // 다른 탭에서 localStorage가 변경될 때 이벤트 리스너 추가
//     window.addEventListener("storage", handleStorageChange);

//     // 컴포넌트가 언마운트되면 이벤트 리스너 제거
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <>
//       <Script
//         src="https://telegram.org/js/telegram-web-app.js"
//         strategy="afterInteractive"
//       />
//       <Footer onGame={onGame} />
//     </>
//   );
// };

// export default ClientOnlyWrapper;
