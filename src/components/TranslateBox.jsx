import React, { useState } from "react";

const TranslateBox = () => {
  const [show, setShow] = useState(false);

  function handleTranlation() {}

  return (
    <main>
      <h1>Text to translate 👇</h1>
      <textarea name="input" id="input">
        How are you?
      </textarea>
      <h1>Select language 👇</h1>
      {show ? (
        <>
          <textarea name="output" id="output" disabled>
            How are you?
          </textarea>
          <button onClick={() => setShow((prev) => !prev)}>Start Over</button>
        </>
      ) : (
        <>
          <label htmlFor="french">
            <input type="radio" id="french" name="language" value="french" />
            French{" "}
            <img src="/src/assets/flags/French.png" alt="Flag of French" />
          </label>

          <label htmlFor="spanish">
            <input type="radio" id="spanish" name="language" value="spanish" />
            Spanish{" "}
            <img src="/src/assets/flags/Spanish.png" alt="Flag of Spain" />
          </label>

          <label htmlFor="japanese">
            <input
              type="radio"
              id="japanese"
              name="language"
              value="japanese"
            />
            Japanese{" "}
            <img src="/src/assets/flags/Japanese.png" alt="Flag of Japan" />
          </label>

          <button onClick={() => setShow((prev) => !prev)}>Translate</button>
        </>
      )}
    </main>
  );
};

export default TranslateBox;
