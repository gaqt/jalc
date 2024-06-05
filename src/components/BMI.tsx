import { evaluate, unit } from "mathjs";
import { Component, Index, Show, createSignal } from "solid-js";

import "./bmi.module.css"

const Bmi: Component = () => {
  const [res, setRes] = createSignal("")
  const [err, setErr] = createSignal("")

  let height!: HTMLInputElement
  let weight!: HTMLInputElement

  const WCLASS = Object.freeze([
    {thres: 0, range: "<16", label: "Severe Thinness"},
    {thres: 16, range: "16 - 17", label: "Moderate Thinness"},
    {thres: 17, range: "17 - 18.5", label: "Mild Thinness"},
    {thres: 18.5, range: "18.5 - 25", label: "Normal"},
    {thres: 25, range: "25 - 30", label: "Overweight"},
    {thres: 30, range: "30 - 35", label: "Obese Class I"},
    {thres: 35, range: "35 - 40", label: "Obese Class II"},
    {thres: 40, range: ">40", label: "Obese Class III"}
  ])

  const classify = (num: number) => {
    const entry = WCLASS.findLast(v => num > v.thres) || {label: "Invalid BMI"}
    return entry.label
  }

  const calculate = () => {
    try {
      let heightStr = height.value
      let weightStr = weight.value

      if (!heightStr || !weightStr) {
        throw Error("Please fill the above fields")
      }

      // checking if has units, defaults to meters and kilograms
      if (evaluate(heightStr).to === undefined) heightStr = `${heightStr}m`
      if (evaluate(weightStr).to === undefined) weightStr = `${weightStr}kg`

      const result = evaluate(`(${weightStr}) / ((${heightStr})*(${heightStr}))`)
        .to("kg / m^2")

      const resultNum = result.toNumber("kg / m^2")
      const resultStr = result.format({ precision: 4 }).toString()
      const resultWClass = classify(resultNum)

      setRes(`${resultStr} -> ${resultWClass}`)
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

  return (
    <div class="flex flex-col gap-2">
      <form onSubmit={handleForm} class="flex flex-col flex-wrap gap-2">
        <div class="flex flex-row flex-wrap gap-2">
          <div class="flex flex-col gap-2">
            <label for="height">Height</label>
            <input ref={height} type="text" id="height" class="bg-slate-900 text-white p-2 w-40" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="Weight">Weight</label>
            <input ref={weight} type="text" id="weight" class="bg-slate-900 text-white p-2 w-40" />
          </div>
        </div>
        <button type="submit" class="btn bg-green-700 w-fit px-2">Calculate</button>
      </form>
      <br />
      <h2>Result:</h2>
      <span innerHTML={res() || "&nbsp;"} class="bg-slate-900 white p-2"></span>
      <Show when={err() != ""}>
        <span class="text-red-500">{err()}</span>
      </Show>
      <br />
      <table class="w-fit">
        <thead>
          <tr>
            <th>Classification</th>
            <th>BMI range - kg/m<sup>2</sup></th>
          </tr>
        </thead>
        <tbody>
          {WCLASS.map(entry => (
            <tr>
              <td>{entry.label}</td>
              <td>{entry.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Bmi
