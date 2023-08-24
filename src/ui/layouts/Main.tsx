import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

interface Props {
  children: React.ReactElement;
}
const Main = ({ children }: Props) => {
  return (
    <div className="bg-natural-100 w-full h-full min-h-screen flex flex-col justify-between">
      <Header />
      <main className=" w-full flex flex-col flex-1 items-stretch min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Main;
