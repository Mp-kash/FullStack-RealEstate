import { useContext } from "react";
import UserDetailContext from "../components/Context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav, getBookings } from "../utils/api";
import { getAllBookings } from "../../../server/controllers/userCntl";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  const { user } = useAuth0();

  const query = useQuery({
    queryKey: ["allBookings", userDetails?.token],
    queryFn: () => getBookings(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, bookings: data })),
    enabled: user !== undefined,
    staleTime: 30000,
  });

  return { ...query };
};

export default useBookings;
