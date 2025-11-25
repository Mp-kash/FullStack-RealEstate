import { useContext } from "react";
import UserDetailContext from "../components/Context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavorites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  const { user } = useAuth0();

  const query = useQuery({
    queryKey: ["allFavorites", userDetails?.token],
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favorites: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  return { ...query };
};

export default useFavorites;
