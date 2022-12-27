import Head from "next/head";

import LoginForm from "../src/components/LoginForm";

export default function Login() {
  return (
    <>
      <Head>
        <title>PEPSI Machine</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm />
      </main>
    </>
  );
}
