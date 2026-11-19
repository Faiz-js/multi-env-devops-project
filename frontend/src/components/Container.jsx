const Container = ({ children }) => {
  console.log("testing feature after pipeline");

  return (
    <div className="max-w-xl h-screen mx-auto p-4 bg-slate-400">{children}</div>
  );
};

export default Container;
