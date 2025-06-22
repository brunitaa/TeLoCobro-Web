import axios from "axios";
import { RISK_API_URL } from "../config";

const riskClient = axios.create({
  baseURL: RISK_API_URL,
  timeout: 5000,
});

export function predictRisk(payload) {
  return riskClient.post("/predict/", payload);
}