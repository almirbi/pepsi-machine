import Head from "next/head";

import LogoutAll from "../src/components/LogoutAll";

export default function Login() {
  return (
    <>
      <Head>
        <title>Logout All</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LogoutAll />
      </main>
    </>
  );
}
