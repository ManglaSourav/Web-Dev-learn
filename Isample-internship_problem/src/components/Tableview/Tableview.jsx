import "./Tableview.css";

import React from "react";

export default function TableView({ plants, setClicked, clicked }) {
  const headers = ["", "Leaf_Color", "Leaf_Shape", "Stem_Color"];

  return (
    <div>
      <div style={{ font: "20px", fontWeight: "bold", marginBottom: "10px" }}>
        Character Table
      </div>
      <table>
        <thead>
          <tr>
            {headers.map((heading, i) => (
              <th key={i}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plants.map((plant, i) => {
            const { Leaf = {}, Stem = {} } = plant.structure;
            return (
              <tr key={i}>
                <td>{plant.name}</td>
                <td
                  style={{ cursor: "pointer" }}
                  // we can use some kind id aossociated with every structure property
                  onClick={() => setClicked(plant.name + "Leaf_Color")}>
                  {Leaf.Leaf_Color ? (
                    <span
                      style={{
                        color: `${
                          clicked == plant.name + "Leaf_Color" ? "blue" : ""
                        }`,
                      }}>
                      {Leaf.Leaf_Color}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => setClicked(plant.name + "Leaf_Shape")}>
                  {Leaf.Leaf_Shape ? (
                    <span
                      style={{
                        color: `${
                          clicked == plant.name + "Leaf_Shape" ? "blue" : ""
                        }`,
                      }}>
                      {Leaf.Leaf_Shape}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => setClicked(plant.name + "Stem_Color")}>
                  {Stem.Stem_Color ? (
                    <span
                      style={{
                        color: `${
                          clicked == plant.name + "Stem_Color" ? "blue" : ""
                        }`,
                      }}>
                      {Stem.Stem_Color}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
