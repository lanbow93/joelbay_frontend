import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="homepage">
      <h1>Welcome to Joelbay Collections</h1>
      <p className="subtitle">Discover a diverse collection of instruments, collectibles, and more!</p>

      <h3>About Us</h3>
      <div className="about">
        <p>
            Joelbay Collections was founded by a group of trustworthy friends with a mission to support individuals facing challenging times, including hardships and loss. Our platform serves as a place where friends can help friends by providing a space to market items for sale. We understand the importance of personal connections, especially during difficult moments.
        </p>
        <p>
            Our approach prioritizes security and flexibility. Buyers can browse items, connect directly with sellers, and arrange purchases securely. We have opted for open and diverse payment methods, ensuring a transparent and personalized experience for all users.
        </p>

        <p>
            Explore the unique stories behind each item and connect with sellers to make a meaningful purchase. At Joelbay Collections, we believe in the power of community and compassion.
        </p>
      </div>
      <Link to={"/listings"}>Enter Here</Link>
    </div>
  );
}

export default Homepage;
