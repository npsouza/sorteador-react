import React from "react";
import classNames from "classnames";

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

  const buildNewNames = (newNames) => {
    setOriginalNames(newNames);
    newNames = newNames
      .replace(/(.+)\n/g, "$1,")
      .split(",")
      .filter((item) => !!item);

    setNames(newNames);
  };

  const brandColor = "#0644A0";

  return (
    <main
      className={classNames(
        "text-center flex flex-col items-center justify-center h-[100vh]",
        {
          "text-white": isFinal,
          "bg-white": !isFinal,
          [`bg-[${brandColor}]`]: isFinal,
        }
      )}
    >
      <h1 className="text-[15rem] ">{name}</h1>
      <div className="w-full">
        {showEditor && (
          <div className="mt-2">
            <div className="flex flex-col items-center w-6/12 mx-auto">
              <label htmlFor="names">Nomes para sorteio</label>
              <textarea
                placeholder="Adicione os nomes aqui..."
                id="names"
                value={originalNames}
                className="text-slate-800 border-2 rounded-sm p-2 resize-x min-h-[20vh] min-w-[400px] mt-2"
                onChange={(e) => buildNewNames(e.target.value)}
              />
              <small className="text-slate-400">
                Os nomes podem ser separados por Enter ou por vírgula
              </small>
            </div>
          </div>
        )}

        <div className="text-center mt-2">
          <button
            className="bg-blue-600 text-white py-2 px-4 uppercase rounded-md hover:bg-blue-700 "
            onClick={startRandomize}
          >
            Sortear {isFinal && "Novamente"}
          </button>

          {!showEditor && (
            <button
              className="ml-2 py-2 px-4 uppercase rounded-md text-white hover:bg-white hover:text-blue-600"
              onClick={() => setShowEditor(true)}
            >
              Editar nomes
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
