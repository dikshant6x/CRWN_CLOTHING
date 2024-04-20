import { createContext, useState, useEffect } from "react"; // very imp
// getting products from data file
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
// import SHOP_DATA from "../../shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // DO NOT REMOVE COMMENT

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []); // NOTE THIS IS SUPPOSED TO BE RUN ONLY ONE TIME SO WE CREATE OUR COLLECTION ONCE OF FIREBASE

  // DO NOT REMOVE COMMENT

  // using async fucntion insde Us effect  , How we extract data from firebase DB as object
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
