"use client";
import Map from "@/features/map/Map";

export default function Home() {
  // const setUser = useUserStore((state) => state.useUser);
  // const [locUser, setLocUser] = useState<UserDocument>();
  // useEffect(() => {
  //   async function manga() {
  //     console.time("USER LOADING");

  //     console.time("AUTH COOKIE");
  //     const authCookie = await getAuthCookie();
  //     console.timeEnd("AUTH COOKIE");

  //     console.time("GET USER");
  //     const user = await getUserByFilter({
  //       _id: authCookie?.userId,
  //     });
  //     console.timeEnd("GET USER");

  //     setUser(user);
  //     setLocUser(user);

  //     console.timeEnd("USER LOADING");
  //   }

  //   manga();
  // }, []);

  return <Map />;
}
