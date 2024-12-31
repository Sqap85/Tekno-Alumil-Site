import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Rota değiştikten sonra sayfa konumunu sıfırla (yukarı kaydır)
    window.scrollTo({
      top: 0,
      behavior: "auto", // Anlık kaydırma (yumuşak değil)
    });
  }, [pathname]); // Rota değiştiğinde çalışır

  return null;
};

export default ScrollToTop;
