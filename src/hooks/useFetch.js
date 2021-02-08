import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useFetch(url, fetchOptions) {
    const [payload, setPayload] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const getData = useCallback(async () => {
        console.log("willFetch");
        try {
            setLoading(true);

            const response = await fetch(url, fetchOptions);
            const json = await response.json();

            if (!response.ok) {
                const error =
                    {
                        404: "The thing you're looking for is not there 🤷‍♂️",
                        400: "Failure: please check the login details",
                    }
                    [response.status] || "Something went wrong! 😭";

                throw new Error(
                    JSON.stringify({ message: error, status: response.status })
                );
            }

            setPayload(json);
            setLoading(false);
        } catch (e) {
            const { message, status } = JSON.parse(e.message);
            console.log(message);
            console.log(status);
            setError(message);
            setLoading(false);
      
            if (status === 401) {
              localStorage.clear();
              history.replace("/login");
            }
          }
        }, [url, fetchOptions, history]);

    useEffect(() => {
        getData();
    }, [getData]);

    return { payload, error, loading };
}

export default useFetch;