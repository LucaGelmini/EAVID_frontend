import Footer from "../ui/Footer";
import Header from "../ui/header/Header";

interface Props {
  children: React.ReactElement;
}
const Main = ({ children }: Props) => {
  return (
    <div className="bg-natural-100 w-full min-h-screen">
      <Header />
      <main className="m-auto w-full flex flex-col justify-stretch min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Main;
