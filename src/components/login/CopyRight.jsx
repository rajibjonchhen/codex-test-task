import { Link } from "react-router-dom";

export default function Copyright(props) {
    return (
      <p variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link to="/">@rajib.jonchhen</Link> {new Date().getFullYear()}
        {"."}
      </p>
    );
  }

  