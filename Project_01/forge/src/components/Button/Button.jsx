import styles from './Button.module.scss';

export default function Button({page}) {
  function handleClick() {
    alert(`Page Name : ${page}`);
  }

  return (
    <button className={styles.button} onClick={handleClick}>
      Click Me
    </button>
  );
}