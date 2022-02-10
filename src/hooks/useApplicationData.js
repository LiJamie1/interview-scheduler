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
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    webSocket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.type === SET_INTERVIEW) dispatch(msg);
    };

    return () => webSocket.close();
  }, []);

  //fetch data
  useEffect(() => {
    const urlBase = process.env.REACT_APP_API_BASE_URL;
    const promiseDays = axios.get(`${urlBase}/api/days`);
    const promiseAppointments = axios.get(`${urlBase}/api/appointments`);
    const promiseInterviewers = axios.get(`${urlBase}/apiinterviewers`);

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
