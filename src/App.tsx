import MarkdownRenderer from "./markdown/MarkdownRender";
import content from "../README.md?raw";

export default function App() {
  return <div>
    <MarkdownRenderer content={content}/>
  </div>;
}
