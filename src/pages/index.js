import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import ViewHome from "@/views/pages/home/ViewHome";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ViewHome />
    </>
  );
}
