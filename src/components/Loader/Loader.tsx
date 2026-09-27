import { ThreeDots } from "react-loader-spinner"
import styles from "./Loader.module.css"

interface LoaderProps {
  variant?: "page" | "fetching"
}

const Loader = ({ variant = "page" }: LoaderProps) => {
  return (
    <div className={`${styles.loader} ${styles[variant]}`}>
      <ThreeDots
        visible
        height={variant === "fetching" ? "30" : "80"}
        width={variant === "fetching" ? "30" : "40"}
        color="#0d6efd"
        radius="16"
        ariaLabel="loading"
      />
    </div>
  )
}

export default Loader
