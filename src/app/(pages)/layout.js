import Navbar from "@/components/navbar/page";

function layout({ children }) {
  return (
    <div>
      <header className="bg-slate-300 sticky top-0 z-30">
        {" "}
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default layout;
