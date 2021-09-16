import Card from "../components/Card";

const Home = () => {
  const data = [
    {
      src: "https://static.thenounproject.com/png/2837107-200.png",
      title: "View Customers",
      info: "See all our customers here",
      link: "/view",
    },
    {
      src: "https://static.thenounproject.com/png/407799-200.png",
      title: "Transfer Money",
      info: "Transfer your money from here",
      link: "/transfer-money",
    },
    {
      src: "https://static.thenounproject.com/png/3948873-200.png",
      title: "Transaction History",
      info: "See all the transactions",
      link: "/transaction-history",
    },
  ];

  return (
    <div className="Home">
      {data.map((val, key) => {
        return (
          <Card
            src={val.src}
            title={val.title}
            info={val.info}
            key={key}
            link={val.link}
          />
        );
      })}
    </div>
  );
};

export default Home;
