import { useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const postNewUser = () => {
    fetch(`/add-user/${user.email}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
    })
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      postNewUser();
    }
    if (user) {
      fetch(`/reservation/${user.email}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        loaded,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
