import { useEffect, useState } from "react";
import { tesloApi } from "../../../api/teslo.api";

export const RequestInfo = () => {
  const [RequestInfo, setRequestInfo] = useState<unknown>();

  useEffect(() => {
    tesloApi
      .get("/auth/private")
      .then((resp) => setRequestInfo(resp.data))
      .catch(() => setRequestInfo("ERROR"));
  }, []);

  return (
    <>
      <h2>Información</h2>
      <pre>{JSON.stringify(RequestInfo, null, 2)}</pre>
    </>
  );
};
