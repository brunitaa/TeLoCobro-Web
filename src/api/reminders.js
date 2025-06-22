import axios from "./axios";

export const sendNotification = (data) =>
  axios.post("/reminders/send", data);

export const enableNotifications = () =>
  axios.post("/reminders/enable");

export const disableNotifications = () =>
  axios.post("/reminders/disable");

export const getNotificationConfig = () =>
  axios.get("/reminders/config");

export const setNotificationFrequency = (data) =>
  axios.post("/reminders/config", data);

export const getAllReminders = () =>
  axios.get("/reminders");

export const getReminderById = (id) =>
  axios.get(`/reminders/${id}`);

export const getRemindersByClient = (clientId) =>
  axios.get(`/reminders/client/${clientId}`);