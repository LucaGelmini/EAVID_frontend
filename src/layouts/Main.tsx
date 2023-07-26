import Footer from "../ui/Footer";
import Header from "../ui/header/Header";

interface Props {
  children: React.ReactElement;
}
const Main = ({ children }: Props) => {
  return (
    <div className="bg-natural-100 w-full h-full min-h-screen flex flex-col justify-between">
      <Header />
      <main className=" w-full flex flex-col justify-around min-h-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Main;
