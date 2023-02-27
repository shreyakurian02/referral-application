import axios from "axios";

axios.defaults.baseURL = "/";

const DEFAULT_ERROR_NOTIFICATION = "Server Error";

const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
  setLoading(false);
};

const handleSuccessResponse = (response, setNotificationStatus) => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      setNotificationStatus({
        message: response.data.notice,
        isOpen: true,
        severity: "success",
      });
    }
  }
  return response;
};

const handleErrorResponse = (axiosErrorObject, setNotificationStatus) => {
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({ authToken: null, email: null, userId: null });
    setTimeout(() => (window.location.href = "/"), 2000);
  }
  setNotificationStatus({
    message:
      axiosErrorObject.response?.data?.error ||
      axiosErrorObject.response?.data?.errors[0] ||
      DEFAULT_ERROR_NOTIFICATION,
    isOpen: true,
    severity: "error",
  });

  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }
  return Promise.reject(axiosErrorObject);
};

const registerIntercepts = (setNotificationStatus) => {
  axios.interceptors.response.use(
    (response) => handleSuccessResponse(response, setNotificationStatus),
    (error) => handleErrorResponse(error, setNotificationStatus)
  );
};

export { setAuthHeaders, registerIntercepts };
