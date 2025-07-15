//app/not-found.tsx

import Image from "next/image";
import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.glitchWrapper}>
        <Image
          // Menggunakan GIF online bertema glitch
          src="https://i.giphy.com/media/uSADi9n3Q2Ie4/giphy.gif"
          alt="Glitching Signal"
          width={200}
          height={200}
          className={styles.image}
          unoptimized={true} // Wajib untuk GIF
          priority
        />
      </div>

      <h1 className={styles.title} data-text="404: NOT FOUND">
        404: NOT FOUND
      </h1>

      <p className={styles.description}>
        The signal has been interrupted. The page you requested is outside the
        broadcast range or has been decommissioned. We suggest returning to a
        known network.
      </p>

      <Link href="/" className={styles.homeButton}>
        BACK
      </Link>
    </div>
  );
}
