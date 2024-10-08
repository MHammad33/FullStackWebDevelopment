import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("")
  }

  return {
    inputProps: {
      type,
      value,
      onChange
    },
    reset
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    console.count("Fetch Resources");


    const fetchResources = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    }

    fetchResources();
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data])
  };

  const service = {
    create,
  };

  return [resources, service];
};