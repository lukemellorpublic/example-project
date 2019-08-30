import { GET_FEES, UPDATE_FEES, SUBMIT_FEES } from "./constants";

export const getFees = () => ({ type: GET_FEES });

export const updateFees = () => ({ type: UPDATE_FEES });

export const submitFees = fees => ({ type: SUBMIT_FEES, payload: fees });
