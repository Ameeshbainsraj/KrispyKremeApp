import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useManagerPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    // Fetch orders and products
    const fetchData = async () => {
      try {
        const orderResponse = await fetch("../api/getOrder");
        const orderData = await orderResponse.json();
        setOrders(orderData);

        const productResponse = await fetch("../api/getProducts");
        const productData = await productResponse.json();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Check if user is logged in
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
      setUserName(user); // Set user's name
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/loginExample");
  };

  return {
    selectedTab,
    setSelectedTab,
    orders,
    products,
    isLoggedIn,
    userName,
    handleTabChange,
    handleLogout
  };
}
