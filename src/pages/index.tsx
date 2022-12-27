import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Head from "next/head";

export default function App() {
  const initialDelay = 50;
  const limit = 30;

  const [name, setName] = useState(null);
  const [count, setCount] = useState(limit);
  const [names, setNames] = useState([]);
  const [delay, setDelay] = useState(initialDelay);
  const [showEditor, setShowEditor] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [originalNames, setOriginalNames] = useState("");

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

  useEffect(() => {
    setTimeout(() => {
      shouldRandomizeName();
    }, delay);
  }, [count, delay, shouldRandomizeName]);

  const startRandomize = () => {
    if (names.length > 1) {
      setDelay(initialDelay);
      setShowEditor(false);
      setIsFinal(false);
      setCount(0);
    }
  };

  const buildNewNames = (newNames) => {
    setOriginalNames(newNames);
    newNames = newNames
      .replace(/(.+)\n/g, "$1,")
      .split(",")
      .filter((item) => Boolean(item));

    setNames(newNames);
  };

  const brandColor = "#6b0bf1";

  return (
    <main
      className={classNames(
        "text-center flex flex-col items-center justify-center h-[100vh]",
        { "text-white": isFinal, "bg-white": !isFinal }
      )}
      style={{ background: isFinal && brandColor }}
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Sorteador de Nomes</title>
      </Head>
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

        {(isFinal || showEditor) && (
          <div className="text-center flex flex-col w-2/12 mx-auto mt-2 gap-2">
            <button
              className={classNames("py-2 px-4 uppercase rounded-md", {
                "text-white": !isFinal,
                "bg-black bg-opacity-20 hover:bg-opacity-30": isFinal,
              })}
              style={{ background: !isFinal && brandColor }}
              onClick={startRandomize}
            >
              Sortear {isFinal && !showEditor && "Novamente"}{" "}
              {names.length > 0 && `(${names.length})`}
            </button>

            {!showEditor && (
              <button
                className="hover:bg-black hover:bg-opacity-10 py-2 px-4 uppercase rounded-md text-white underline underline-offset-2 decoration-dotted "
                onClick={() => setShowEditor(true)}
              >
                Editar nomes
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
