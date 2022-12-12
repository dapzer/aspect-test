import React, { useEffect } from "react";
import { useStoreContext } from "./store/store";
import HomePageContainer from "./components/containers/HomePageContainer";

export default function App() {
  const store = useStoreContext();


 useEffect(() => {
   store.fetchData()
 }, [])

  return (
    <div className="App container">
      <HomePageContainer />
    </div>
  );
}
