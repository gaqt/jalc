import { Component } from "solid-js";

const Layout: Component = (props: any) => {
  return (<>
    <h1 class="p-3 font-bold text-xl">
      Powered by&nbsp;
      <a
        class="underline text-blue-400 hover:text-blue-500 visited:text-purple-400"
        href="https://mathjs.org/docs/index.html">
        math.js
      </a>
    </h1>
    <div class="flex flex-col-reverse gap-3 md:flex-row justify-center mt-3 px-3">
      <div class="flex flex-row md:flex-col flex-wrap gap-3 p-3 bg-slate-700 text-black w-full md:w-[21%] md:ms-2 h-fit">
        <Entry href="/">Text Calculator</Entry>
        <Entry href="/bmi">BMI Calculator</Entry>
      </div>
      <div class="p-3 bg-slate-700 w-full md:w-[70%] h-fit">
        {props.children}
      </div>
    </div>
  </>)
}

interface EntryProps {
  href: string
  children: string
}

const Entry: Component<EntryProps> = (props: EntryProps) => {
  return (
    <a class="bg-slate-300 hover:bg-slate-400 text-nowrap p-1 w-fit block md:w-full" href={props.href}>{props.children}</a>
  )
}

export default Layout;
