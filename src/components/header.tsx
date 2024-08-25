import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <Link to="/">
        <p>home</p>
      </Link>
      <Link to="/list">
        <p>list</p>
      </Link>
    </>
  );
};
