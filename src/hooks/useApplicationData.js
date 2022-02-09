import { useEffect, useReducer } from "react";
import axios from "axios";
import appReducer, {
  SET_DAY,
  SET_INTERVIEW,
  SET_APPLICATION_DATA,
} from "reducers/useApplicationDataReducer";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(appReducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    const route = `api/appointments/${id}`;
    return axios
      .put(route, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview }));
  };

  const cancelInterview = (id) => {
    const route = `api/appointments/${id}`;
    return axios
      .delete(route)
      .then(() => dispatch({ type: SET_INTERVIEW, id, interview: null }));
  };

  //websocket
  useEffect(() => {
    const webSocket = new WebSocket(
      process.env.REACT_APP_WEBSOCKET_URL,
      "protocolOne"
    );

    webSocket.onopen = () => {
      webSocket.send("ping");
    };

    webSocket.onmessage = (event) => {
      console.log(event.data);
    };
    return () => webSocket.close();
  }, []);

  //fetch data
  useEffect(() => {
    const urlBase = "http://localhost:8001/api/";
    const promiseDays = axios.get(`${urlBase}days`);
    const promiseAppointments = axios.get(`${urlBase}appointments`);
    const promiseInterviewers = axios.get(`${urlBase}interviewers`);

    // Grabs information for state from api from promise calls.
    // .all - if any of the promises fail they all fail
    Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        dispatch({
          type: SET_APPLICATION_DATA,
          data: { days, appointments, interviewers },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
