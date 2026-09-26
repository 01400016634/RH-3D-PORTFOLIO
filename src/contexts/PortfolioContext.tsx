import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { portfolioData as initialStaticData } from '../data/portfolioData';

// We'll store all data in a single document for simplicity: collection 'portfolio', doc 'main'
const DOC_REF = doc(db, 'portfolio', 'main');

interface PortfolioContextType {
  data: typeof initialStaticData;
  loading: boolean;
  updateSection: (sectionKey: keyof typeof initialStaticData, newData: any) => Promise<void>;
  initializeData: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType>({} as PortfolioContextType);

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<typeof initialStaticData>(initialStaticData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(DOC_REF, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as typeof initialStaticData);
      } else {
        console.log("No data found in Firestore, using static fallback.");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching portfolio data:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateSection = async (sectionKey: keyof typeof initialStaticData, newData: any) => {
    try {
      await updateDoc(DOC_REF, {
        [sectionKey]: newData
      });
    } catch (error: any) {
      if (error.code === 'not-found') {
        // Document doesn't exist yet, create it first
        await initializeData();
        await updateDoc(DOC_REF, {
          [sectionKey]: newData
        });
      } else {
        throw error;
      }
    }
  };

  const initializeData = async () => {
    await setDoc(DOC_REF, initialStaticData);
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, updateSection, initializeData }}>
      {children}
    </PortfolioContext.Provider>
  );
};
