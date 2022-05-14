import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IHeader {
  headerTitle: string;
  back: boolean;
}

export default function Header({ headerTitle, back }: IHeader) {
  const navigate = useNavigate();

  return (
    <div className="header px-4">
      <Navbar>
        <Navbar.Brand href="/home" className="d-flex">
          {back && (
            <div style={{ width: "7%" }}>
              <img
                onClick={() => navigate(-1)}
                src={"/left-arrow.svg"}
                alt=""
                style={{ width: "50%" }}
              />
            </div>
          )}
          <span style={{ fontWeight: "bold" }}>
            {headerTitle ? headerTitle : "Home"}
          </span>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
