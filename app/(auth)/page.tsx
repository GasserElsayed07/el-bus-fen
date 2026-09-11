import {
  getBusEntryByFilter,
  getLastSevenHoursBusEntries,
} from "@/features/shared/repositories/bus-entry-repo";
import Map from "@/features/map/Map";
import { BusEntryType } from "@/features/shared/models/bus-entry";

export default async function Home() {
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

  // this filters the entries to only include those from the last 24 hours
  const entryLogs = await getLastSevenHoursBusEntries();

  return <Map entryLogs={entryLogs as BusEntryType[]} />;
}
