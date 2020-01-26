import React from "react";

import "./index.css";

export default function App() {
  const initialDelay = 50;
  const limit = 30;

  const [name, setName] = React.useState(null);
  const [count, setCount] = React.useState(limit);
  const [names, setNames] = React.useState([]);
  const [delay, setDelay] = React.useState(initialDelay);
  const [showEditor, setShowEditor] = React.useState(true);
  const [isFinal, setIsFinal] = React.useState(false);
  const [originalNames, setOriginalNames] = React.useState("");

  const randomizeName = () => {
    let index = Math.floor(Math.random() * names.length);
    setName(names[index]);
  };

  const shouldRandomizeName = () => {
    if (count < limit) {
      randomizeName();
      setCount(count + 1);
      switch (count) {
        case limit * 0.5:
          setDelay(delay * 2);
          break;
        case limit * 0.7:
          setDelay(delay * 1.5);
          break;
        case limit * 0.8:
          setDelay(delay * 1.2);
          break;
        default:
          break;
      }
    }
    if (count === limit && name) {
      setIsFinal(true);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      shouldRandomizeName();
    }, delay);
  }, [count, delay, shouldRandomizeName]);

  const startRandomize = () => {
    setDelay(initialDelay);
    setShowEditor(false);
    setIsFinal(false);
    setCount(0);
  };

  const buildNewNames = newNames => {
    setOriginalNames(newNames);
    newNames = newNames
      .replace(/(.+)\n/g, "$1,")
      .split(",")
      .filter(item => !!item);

    setNames(newNames);
  };

  return (
    <div
      className={`text-center d-flex flex-column align-items-center justify-content-center ${isFinal && " text-white"}`}
      style={{ height: "100vh", backgroundColor: `${isFinal ? "#0644A0" : "white"}` }}
    >
      <div>
        <h1 className={`display-1`}>{name}</h1>
      </div>
      <div className="container-fluid">
        {showEditor && (
          <div className="row mt-2">
            <div className="col-6 col-lg-4 m-auto">
              <label htmlFor="names">Nomes para sorteio</label>
              <textarea
                placeholder="Adicionar os nomes aqui..."
                id="names"
                value={originalNames}
                style={{ minHeight: "20vh", resize: "x" }}
                className="form-control"
                onChange={e => buildNewNames(e.target.value)}
              ></textarea>
            </div>
          </div>
        )}

        <div className="text-center mt-2">
          <button className="btn btn-secondary" onClick={startRandomize}>
            Sortear
          </button>

          {!showEditor && (
            <button className="ml-2 btn btn-outline-secondary" onClick={() => setShowEditor(true)}>
              Editar nomes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
