import Header from '../components/Header/Header';
import Button from '../components/Button/Button';

function Home() {
  return (
    <div>
      <Header />
      <p>Hello, this is your Home page!</p>
      <Button page='Home'/>
    </div>
  );
}
export default Home;