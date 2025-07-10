import OpenAI from "openai";
import React, { useState } from "react";

const TranslateBox = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("French");

  function clearInputs() {
    setShow(false);
    setInput("");
    setOutput("");
  }

  async function handleTranlation() {
    if (input) {
      setShow(true);
      setOutput("Waiting for translation...");

      const messages = [
        {
          role: "system",
          content:
            "Towim zadaniem będzie tłumacznie słów z jednego języka na drugi",
        },
        {
          role: "user",
          content: `
        '''
        Jak się masz?
        ''' 
        
        Language: English
        `,
        },
        {
          role: "assistant",
          content: "How are you?",
        },
        {
          role: "user",
          content: `
        '''
        ${input}
        '''
        
        Langugae: ${language}.
        `,
        },
      ];

      try {
        const client = new OpenAI({
          apiKey: import.meta.env.VITE_OPENAI_API_KEY,
          dangerouslyAllowBrowser: true,
        });

        const response = await client.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_completion_tokens: 2048,
        });

        console.log(response);
        setOutput(response.choices[0].message.content);
      } catch (error) {
        setOutput(error);
      }
    }
  }

  return (
    <main>
      <h1>Text to translate 👇</h1>
      <textarea
        name="input"
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      {show ? (
        <>
          <h1>Your translation 👇</h1>
          <textarea
            name="output"
            id="output"
            value={output}
            disabled
            required
          ></textarea>
          <button onClick={clearInputs}>Start Over</button>
        </>
      ) : (
        <>
          <h1>Select language 👇</h1>
          <label htmlFor="french">
            <input
              type="radio"
              id="french"
              name="language"
              value="french"
              defaultChecked
              onClick={() => setLanguage("French")}
            />
            French{" "}
            <img src="/src/assets/flags/French.png" alt="Flag of French" />
          </label>

          <label htmlFor="spanish">
            <input
              type="radio"
              id="spanish"
              name="language"
              value="spanish"
              onClick={() => setLanguage("Spanish")}
            />
            Spanish{" "}
            <img src="/src/assets/flags/Spanish.png" alt="Flag of Spain" />
          </label>

          <label htmlFor="japanese">
            <input
              type="radio"
              id="japanese"
              name="language"
              value="japanese"
              onClick={() => setLanguage("Japanese")}
            />
            Japanese{" "}
            <img src="/src/assets/flags/Japanese.png" alt="Flag of Japan" />
          </label>

          <button onClick={handleTranlation}>Translate</button>
        </>
      )}
    </main>
  );
};

export default TranslateBox;
