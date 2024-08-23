import { useEffect, useState } from "react";
import Autocomplete from "../Autocomplete/Autocomplete.jsx";
import { fetchData } from "../../utils/index.js";
import { REACT_APP_STATE_URL, REACT_APP_GITHUB_BASE_URL } from "../../constants/apiUrls.js";

import styles from "./App.module.scss";

const App = () => {
  const [states, setStates] = useState([]);
  const [githubUsers, setGithubUsers] = useState([]);

  const getStatesData = async () => {
    try {
      if(!REACT_APP_STATE_URL) {
        return;
      }
      const response = await fetchData(REACT_APP_STATE_URL);
      setStates(handleModifiedData(response))
    } catch (error) {
      setStates([]);
      // Optionally Alert or Toast for show the error
    }
  }

  const handleModifiedData = items =>
    items.map(item => ({
      text: item?.login || item?.name,
      value: item?.login || item?.abbreviation
    }));

  const getGithubUsersData = async (userInput) => {
    try {
      if (!userInput) return;
      const response = await fetchData(`${REACT_APP_GITHUB_BASE_URL}/search/users?q=${userInput}&per_page=10`);
      setGithubUsers(handleModifiedData(response.items))
    } catch (error) {
      setGithubUsers([])
      // Optionally Alert or Toast for show the error
    }
  }

  const handleSelectState = (value) => {
    console.log("Selected state code: ", value);
  };

  const handleSelectGithubUser = (value) => {
    console.log("Selected github user: ", value);
  };

  useEffect(() => {
    getStatesData();
  }, [])

  return (
    <div className={ styles.content }>
      <div className={ styles.wrapper }>
        <h2>State:</h2>
        <Autocomplete data={ states } onSelect={ handleSelectState } />
      </div>
      <div className={ styles.wrapper }>
        <h2>Github User:</h2>
        <Autocomplete data={ githubUsers } onSelect={ handleSelectGithubUser } triggerAnotherDataSource={ getGithubUsersData } />
      </div>
    </div>
  );
}

export default App;
