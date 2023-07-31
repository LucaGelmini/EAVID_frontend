interface Props {
  className?: string;
}

function Footer({ className = "" }: Props) {
  return (
    <footer
      className={`w-full h-full py-10 text-white bg-gray-700 grid gap-4 grid-rows-3 grid-cols-1 md:grid-cols-3 md:grid-rows-1  ${className}`}
    >
      <p className="m-auto text-center">EAVID 2023</p>
      <p className="m-auto text-center">Contactanos</p>
      <p className="m-auto text-center">Github</p>
    </footer>
  );
}

export default Footer;
