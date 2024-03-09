import { useEffect, useState } from "react";

export type ResponseType = {
  status: string;
  data?: any;
  error?: string;
};

export const useApi = (url: string) => {
  const [data, setData] = useState<ResponseType>({
    status: "initial",
  });

  useEffect(() => {
    (async () => {
      try {
        setData({ status: "fetching" });
        const response = await fetch(url);
        if (response.ok)
          setData({ status: "fetched", data: await response.json() });
        else throw Error(await response.json());
      } catch (error: any) {
        console.error("Failed to load monthly ascents: ", error);
        setData({ status: "error", error: error.message });
      }
    })();
  }, [url]);

  return data;
};
