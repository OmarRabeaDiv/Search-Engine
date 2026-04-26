export default function FooterComponent() {
  return (
    <footer className="flex items-end mb-5 w-full px-10 justify-between">
      <ul className="flex gap-5 align-center h-fit  uppercase ">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="">Github</a>
        </li>
      </ul>

      <p>&copy; Copyright BIG DATA TEAM FCAI</p>
    </footer>
  );
}
