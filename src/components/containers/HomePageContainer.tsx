import React, { FC, useContext } from 'react';
import { observer } from "mobx-react-lite";
import LocationCard from "../location-card/LocationCard";
import { useStoreContext } from "../../store/store";
import Controls from "../controls/Controls";

interface Props {

}

const HomePageContainer: FC<Props> = () => {
  const store = useStoreContext();

  if (!store.isLoaded) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      {store.testLocations.length > 0 && store.testLocations.map((el) => (
        <LocationCard key={`location-card-${el.testLocationID}`} location={el} />
      ))}

      <Controls />
    </div>
  );
};

export default observer(HomePageContainer);
