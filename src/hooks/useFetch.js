import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
const noop = () => {};

function useFetch({
    onStart = noop,
    onSuccess = noop,
    onFailure = noop,
    url, 
    fetchOptions,
    condition = true,
}) {
    const [payload, setPayload] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const getData = useCallback(async () => {
        console.log("willFetch");
        try {
            setLoading(true);
            onStart();

            const response = await fetch(url, fetchOptions);
            console.log(response);
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
            onSuccess(json);
        } catch (e) {
            const { message, status } = JSON.parse(e.message);
            console.log(message);
            console.log(status);
            onFailure(e.message);

            setError(message);
            setLoading(false);
      
            if (status === 401) {
              localStorage.clear();
              history.replace("/login");
            }
          }
        }, [onStart, onSuccess, onFailure, url, fetchOptions, history]);

    useEffect(() => {
        if(condition) {
        getData();
        }
    }, [getData], condition);

    return { payload, error, loading };
}

export default useFetch;