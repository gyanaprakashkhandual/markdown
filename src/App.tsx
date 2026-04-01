import Markdown from "./markdown/Markdown";
import context from './test/Markdown.test.md?raw'

export default function App() {
  return(
    <div>
      <Markdown content={context}/>
    </div>
  )
}
