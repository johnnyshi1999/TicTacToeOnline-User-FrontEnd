import { Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

export default function ActivateAccount() {
  const { activationToken } = useParams();
  const [activated, setActivated] = React.useState(false);
  const [responseMsg, setResponseMsg] = React.useState();
  const [severity, setSeverity] = React.useState("error");

  React.useEffect(() => {
    const activateAccount = async () => {
      console.log(activationToken);
      const response = await axios.post(
        `${API.url}/api/auth/activate/${activationToken}`
        // `http://localhost:4000/api/auth/activate/${activationToken}`
      );
      console.log(response);
      if (response.status === 200) {
        setActivated(true);
        setSeverity("success");
      }

      setResponseMsg(response.data.message);
    };

    if (!activated) {
      activateAccount();
    }
  }, []);

  return (
    <div>
      {activated ? (
        <div>
          {responseMsg && <Alert severity={severity}>{responseMsg}</Alert>}
        </div>
      ) : (
        <Typography>Your account was activated.</Typography>
      )}
    </div>
  );
}
