import { Signup, Banner, NavInfo, Navbar, Login } from "./_components";

export default async function Home() {
  return (
    <main>
      <NavInfo />
      <Navbar />
      <Banner msg={"Get 10% off on business sign up"} />
      <Login />
      <Signup />
    </main>
  );
}
