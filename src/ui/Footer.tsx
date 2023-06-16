interface Props {
  className?: string;
}

function Footer({ className = "" }: Props) {
  return (
    <footer className={className + "w-full "}>
      <p>Footer</p>
    </footer>
  );
}

export default Footer;
