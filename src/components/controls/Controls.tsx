import React, { FC } from 'react';
import styles from "./controls.module.scss"
import { useStoreContext } from "../../store/store";
import { observer } from "mobx-react-lite";

interface Props {

}

const Controls: FC<Props> = () => {
  const store = useStoreContext();

  return (
    <div className={styles['body']}>
      <button onClick={() => store.addTestLocation()}>Добавить локацию</button>
      {store.testLocations.length > 0 && (
        <button onClick={() => console.log(store.getTestLocationsList())}>Вывести результат в консоль</button>
      )}
    </div>
  );
};

export default observer(Controls);
