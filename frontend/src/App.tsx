import ApiRequester from "./components/Api-requester/api-requester";
import "./styles/global.css";
// import Header from "./components/Header/header";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleApiResponse = (data: any) => {
    console.log("Resposta da API:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className=" p-10 text-3xl text-center mt-10">
        Teste de Requisição API
      </h1>
      {/* <ApiRequester
        method="GET"
        urlPlaceholder="https://jsonplaceholder.typicode.com/posts"
        onRequest={handleApiResponse}
      /> */}
      <ApiRequester
        method="POST"
        urlPlaceholder="https://jsonplaceholder.typicode.com/posts"
        bodyPlaceholder='{"title": "foo", "body": "bar", "userId": 1}'
        onRequest={handleApiResponse}
      />
    </div>
  );
}

export default App;
