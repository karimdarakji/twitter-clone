import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useActivateUserMutation } from "../redux/auth";

const ViewUserActivation = () => {
  const navigate = useNavigate();
  // get token from params
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const activationCode = params.get("activation_code");

  const [activateUser, { error }] = useActivateUserMutation();

  const activate = async () => {
    const userId = activationCode?.split("-X-X-")[1];
    if (userId && activationCode) {
      await activateUser({
        userId,
        token: activationCode,
      })
        .unwrap()
        .then(() => {
          console.log("hereeeeee");
          navigate("/", {
            state: {
              userActivated: true,
            },
          });
        });
    }
  };

  useEffect(() => {
    activate();
  }, []);

  if (error?.data?.message) {
    return error.data.message;
  }

  return null;
};

export default ViewUserActivation;
