import './App.css';

import { useEffect, useState } from 'react';

import Tableview from './components/Tableview/Tableview';
import Treeview from './components/Treeview/Treeview';


function App() {
  const [plants, setPlants] = useState([]);
  const [clicked, setClicked] = useState("");
  useEffect(() => {

    // Get data from Restful API
    const dummyPlants = [
      {
        name: "PlantA",
        structure: {
          Leaf: {
            Leaf_Color: "Green",
            Leaf_Shape: "Toothed"
          },
          Stem: {
            Stem_Color: "Green"
          }
        }
      },
      {
        name: "PlantB",
        structure: {
          Leaf: {
            Leaf_Color: "Red",
            Leaf_Shape: "" //Leaf_Shape is blank and stem color is not present in data
          },
        }
      },
    ]

    setPlants(dummyPlants);
    // for cleaning
    return () => {
    }
  }, [])

  return (
    <div className='Box'>
      <div className="Inner-Box">
        <Tableview plants={plants} setClicked={setClicked} clicked={clicked} />
        <div style={{ padding: "10px" }}></div>
        <Treeview plants={plants} setClicked={setClicked} clicked={clicked} />
      </div >
    </div>
  );
}

export default App;
