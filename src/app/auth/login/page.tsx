import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/assets/images/logo.png";
import BackgroundImage from "../../../../public/assets/images/pablo-sign-in 1.svg";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Lendsqr Logo" width={173} height={36} />
        </div>
        <div className={styles.illustration}>
          <Image
            src={BackgroundImage}
            alt="Login Illustration"
            width={600}
            height={337}
          />
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.loginForm}>
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form>
            <div className={styles.formGroup}>
              <input type="email" placeholder="Email" required />
            </div>
            <div className={styles.formGroup}>
              <input type="password" placeholder="Password" required />
              <span className={styles.showPassword}>SHOW</span>
            </div>

            <Link href="#" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </Link>

            <button type="submit" className={styles.loginButton}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
