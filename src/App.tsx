import { createSignal, type Component, Show } from 'solid-js'
import { evaluate, isArray, isFunction, isResultSet } from "mathjs"

const App: Component = () => {
  const [res, setRes] = createSignal("")
  const [err, setErr] = createSignal("")

  let input!: HTMLSpanElement

  const calculate = () => {
    const value = input.innerHTML.replaceAll("<br>", "\n")
    try {
      let result = evaluate(value)
      let resultStr;
      if (result === undefined || typeof result === "function") {
        resultStr = ""
      } else if (isResultSet(result)) {
        resultStr = (result.entries as any[])
          .filter(v => typeof v !== "function")
          .reduce((acc, v) => `${acc}<br>${v}`, "")
          .replace("<br>", "")
      } else {
        resultStr = result.toString();
      }
      setRes(resultStr)
      setErr("")
    } catch (e: any) {
      setRes("")
      setErr(e.toString())
    }
  }

  const handleForm = (e: Event) => {
    e.preventDefault()
    calculate()
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      calculate()
    }
  }

  return (
    <div class="p-3 my-3 flex flex-col gap-2 bg-slate-700 w-100 lg:w-[70%] mx-auto">
      <h1>Calculator Input:</h1>
      <form onSubmit={handleForm} class='flex flex-col gap-2'>
        <span onKeyPress={handleKeyPress} ref={input} class="input bg-slate-900 text-white p-2" role="textbox" contentEditable></span>
        <button class="btn bg-green-700 w-fit px-2">Calculate</button>
      </form>
      <br/>
      <h2>Result:</h2>
      <span innerHTML={res() || "&nbsp;"} class="bg-slate-900 white p-2"></span>
      <Show when={err() != ""}>
        <span class="text-red-500">{err()}</span>
      </Show>
    </div>
  );
};

export default App
