import UserList from "./components/UserList";
import { fetchAllUsers } from "./api/fetchAllUsers";

export default async function AdminPage() {
  const users = await fetchAllUsers();
  return <UserList users={users} />;
}
