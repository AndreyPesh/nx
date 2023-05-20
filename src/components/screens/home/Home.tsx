import { NextFont } from "next/dist/compiled/@next/font";
import { ReactNode } from "react";

const Home = ({children, inter}: {children: ReactNode, inter: NextFont}) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default Home;