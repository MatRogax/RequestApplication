/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react";

interface ResponseDisplayProps {
  response: any;
  error: string | null;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({
  response,
  error,
}) => {
  if (response) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Resposta da API:
        </h2>
        <pre className="mt-2 p-4 bg-gray-100 text-gray-800 rounded-md overflow-auto break-words whitespace-pre-wrap">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 text-red-500">
        <h2 className="text-xl font-semibold">Erro:</h2>
        <pre className="mt-2 p-4 bg-red-100 text-red-800 rounded-md">
          {error}
        </pre>
      </div>
    );
  }

  return null;
};

interface ApiRequestProps {
  method?: string;
  urlPlaceholder?: string;
  bodyPlaceholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRequest?: (data: any) => void;
}

const ApiRequest: React.FC<ApiRequestProps> = ({
  method = "GET",
  urlPlaceholder,
  bodyPlaceholder,
  onRequest,
}) => {
  const [methodState, setMethodState] = useState<string>(method);
  const [url, setUrl] = useState<string>("");
  const [body, setBody] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const predefinedRoutes = [
    {
      method: "GET",
      url: "http://localhost:3000/api/v1/admins/451f8b61-9e18-4611-82f1-fbbe21d9b042",
    },
    { method: "GET", url: "http://localhost:3000/api/v1/admins/all" },
    {
      method: "GET",
      url: "http://localhost:3000/api/v1/users/54fc03f0-806e-4b72-a967-903f20940be4",
    },
    { method: "POST", url: "http://localhost:3000/api/v1/auth/login" },
    { method: "POST", url: "http://localhost:3000/api/v1/auth/register" },
  ];

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const options: RequestInit = {
      method: methodState,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (methodState === "POST" || methodState === "PUT") {
      try {
        const parsedBody = JSON.parse(body);
        options.body = JSON.stringify(parsedBody);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        setError("Erro ao formatar o corpo da requisição: " + e.message);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Erro ao fazer a requisição");
      }
      const data = await res.json();
      setResponse(data);
      if (onRequest) onRequest(data);
    } catch (error) {
      setError((error as Error).message || "Erro na requisição");
    } finally {
      setLoading(false);
    }
  };

  const handleRouteSelection = (selectedRoute: string, method: string) => {
    setUrl(selectedRoute);
    setMethodState(method);
  };

  return (
    <div className="mt-6 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Rota Predefinida:</label>
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const [selectedMethod, selectedUrl] = e.target.value.split("|");
            handleRouteSelection(selectedUrl, selectedMethod);
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecione uma rota</option>
          {predefinedRoutes.map((route, index) => (
            <option key={index} value={`${route.method}|${route.url}`}>
              {route.method}: {route.url}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Método:</label>
        <select
          value={methodState}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setMethodState(e.target.value)
          }
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">URL da API:</label>
        <input
          type="text"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          placeholder={urlPlaceholder || "Insira a URL da API"}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {(methodState === "POST" || methodState === "PUT") && (
        <div className="mb-4">
          <label className="block text-gray-700">
            Corpo da requisição (JSON):
          </label>
          <textarea
            value={body}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setBody(e.target.value)
            }
            placeholder={
              bodyPlaceholder || 'Exemplo: {"nome": "João", "idade": 30}'
            }
            rows={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={sendRequest}
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-400"
        >
          {loading ? "Enviando..." : "Enviar Requisição"}
        </button>
      </div>

      <ResponseDisplay response={response} error={error} />
    </div>
  );
};

export default ApiRequest;
