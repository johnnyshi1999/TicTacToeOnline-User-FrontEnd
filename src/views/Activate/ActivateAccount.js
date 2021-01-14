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
      const response = await axios.post(
        `${API.url}/api/auth/activate/${activationToken}`
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
  }, [activated, activationToken]);

  return (
    <div>
      {activated ? (
        <div>
          {responseMsg && <Alert severity={severity}>{responseMsg}</Alert>}
        </div>
      ) : (
        <Typography>
          We are tried to activate your account but something went wrong.
        </Typography>
      )}
    </div>
  );
}
