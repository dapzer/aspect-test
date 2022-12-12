import React, { FC } from 'react';
import { faLocationDot, faLeaf, faServer, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icon: string
}

const Icons: FC<Props> = ({icon}) => {
  switch (icon) {
    case "faLocationDot":
     return <FontAwesomeIcon icon={faLocationDot}/>
    case "faLeaf":
     return <FontAwesomeIcon icon={faLeaf}/>
    case "faServer":
     return <FontAwesomeIcon icon={faServer}/>
    default:
      return null

  }
};

export default Icons;
