import Markdown from "./markdown/Markdown";
import markdownContent from "../README.md?raw";

export default function App() {
  return (
    <div>
      <Markdown content={markdownContent} />
    </div>
  );
}