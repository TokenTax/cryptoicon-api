import Link from "next/link";

const IndexPage = () => {
  return (
    <div>
      <h1>Hello Nextjs 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </div>
  );
};

export default IndexPage;
