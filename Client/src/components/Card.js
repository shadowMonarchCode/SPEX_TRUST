import { Link } from "react-router-dom";
import next from "../assets/next.svg";

const Card = (props) => {
  return (
    <div className="Card">
      <div className="Card_Image">
        <img src={props.src} alt="Card" />
      </div>
      <div className="Card_Body">
        <h1>{props.title}</h1>
        <p>{props.info}</p>
        <div className="Card_Btn">
          <Link to={props.link}>
            <img src={next} alt="next"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
