import "./Treeview.css";
import React from "react";

const printLeafNode = (leafObj, setClicked, clicked, name) => {
  const keys = Object.keys(leafObj);
  console.log(keys);

  if (keys.length == 0) return;
  return (
    <ul>
      {keys.map((key, i) => {
        return (
          <>
            {leafObj[key] && (
              <li
                style={{ cursor: "pointer" }}
                onClick={() => setClicked(name + key)}>
                <span
                  style={{
                    color: `${clicked == name + key ? "blue" : ""}`,
                  }}>
                  {leafObj[key]}
                </span>
              </li>
            )}
          </>
        );
      })}
    </ul>
  );
};

export default function TreeView({ plants, setClicked, clicked }) {
  return (
    <div>
      <div style={{ font: "20px", fontWeight: "bold" }}>All Plants</div>
      <ul className="tree">
        {plants.map((plant, i) => {
          const { name, structure = {} } = plant;
          const keys = Object.keys(structure);

          return (
            <>
              {name && (
                <li>
                  <span>{name}</span>
                  <ul>
                    {keys.length > 0 &&
                      keys.map((key, i) => (
                        <li>
                          <span key={i}>{key}</span>
                          {printLeafNode(
                            structure[key],
                            setClicked,
                            clicked,
                            name
                          )}
                        </li>
                      ))}
                  </ul>
                </li>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
}

// <li>
//               <span>Nivel 1</span>
//             </li>

//             <li>
//               <span>Nivel 1</span>
//               <ul>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <span>Nivel 1</span>
//               <ul>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>

//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//                 <li>
//                   <span>Nivel 2</span>
//                 </li>
//               </ul>
//             </li>
