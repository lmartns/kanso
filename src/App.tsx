import WriterEditor from "./components/WriterEditor";

function App() {
  return (
    <main className="min-h-screen flex items-start justify-center p-16 bg-background">
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-info">Info</button>
      <button className="btn btn-success">Success</button>
      <button className="btn btn-warning">Warning</button>
      <button className="btn btn-error">Error</button>
    </main>
  );
}

export default App;
