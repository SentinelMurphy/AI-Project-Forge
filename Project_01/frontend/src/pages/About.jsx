import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
function About() {
  return (
    <div>
      <Header />
      <p>Hello, this is your About page!</p>
      <Button page='About'/>
    </div>
  );
}
export default About;