import HeaderNavComponent from '../components/HeaderNavComponent';
import SearchComponent from '../components/SearchComponent';
import FooterComponent from "../components/FooterComponent";


export default function Home() {
  return (
    <div className="rootContent">
      <HeaderNavComponent />
      <SearchComponent />
      <FooterComponent />
    </div>
  );
}
