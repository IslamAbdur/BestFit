import Image from "next/image";
import styles from "./page.module.css";
import UploadPage from "./components/wardrobe.jsx";

export default function Home() {
  return (
    <div className={styles.page}>
      <UploadPage></UploadPage>
    </div>
  );
}
