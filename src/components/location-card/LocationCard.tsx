import React, { FC } from 'react';
import { observer } from "mobx-react-lite";
import styles from "./location-card.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVial, faTrashCan, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { TestLocation, useStoreContext } from "../../store/store";
import Icons from "./Icons";

interface Props {
  location: TestLocation
}

interface Selector {
  id: number
  title: string
  field: keyof TestLocation
  keyText: string
  arrayName: "servers" | "envs" | "locations"
  icon: string
}

const selectors: Selector[] = [
  {
    id: 1,
    title: "Локация",
    field: "locationID",
    keyText: "location-selector",
    arrayName: "locations",
    icon: "faLocationDot"
  },
  {
    id: 2,
    title: "Среда",
    field: "envID",
    keyText: "location-env-selector",
    arrayName: "envs",
    icon: "faLeaf"
  },
  {
    id: 3,
    title: "Серверы",
    field: "serverID",
    keyText: "location-env",
    arrayName: "servers",
    icon: "faServer"
  }
]

const LocationCard: FC<Props> = ({location}) => {
  const store = useStoreContext();

  const updateField = (field: keyof TestLocation, value: string) => {
    store.updateTestLocation(location.testLocationID, field, value)
  }

  return (
    <div className={styles['body']}>
      <div className={styles['header']}>
        <div className={styles['item']}>
          <FontAwesomeIcon icon={faVial} size={"2x"}/>
          <h1>Тестовая локация {location.testLocationID}</h1>
        </div>
        <button onClick={() => store.deleteTestLocation(location.testLocationID)}>
          <FontAwesomeIcon icon={faTrashCan} color={"red"} size={"2x"}/>
        </button>
      </div>
      <div className={styles['block']}>
        {selectors.map((value) => (
          <div className={styles['item']} key={`selector-${value.id}`}>
            <p>{value.title}</p>
            <div className={styles['icon_frame']}>
              <span>
                <Icons icon={value.icon}/>
              </span>
              <select value={location[value.field]} onChange={(event) => updateField(value.field, event.target.value)}>
                {store[value.arrayName].map((el) => (
                  <option key={`${value.keyText}-${el[value.field as keyof typeof el]}`}
                          value={el[value.field as keyof typeof el]}>{el.name}</option>
                ))}
              </select>
            </div>

          </div>
        ))}
      </div>
      <div className={styles['item']}>
        <p>Подсказка</p>
        <div className={styles['icon_frame']}>
          <span>
            <FontAwesomeIcon icon={faQuestion}/>
          </span>
          <input value={location.hint} type="text" placeholder={"Комментарий по локаций"}
                 onChange={(event) => updateField("hint", event.target.value)}/>
        </div>

      </div>
    </div>
  );
};

export default observer(LocationCard);
