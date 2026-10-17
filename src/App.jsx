import Header from "./pages/header/Header";
import Main from "./pages/main/Main";

export default function App() {
  return (
    <div className="bg-linear-to-b from-teal-800 to-emerald-700 w-full min-h-screen flex flex-col items-center justify-center gap-10">
      <Header />
      <Main />
    </div>
  );
}
