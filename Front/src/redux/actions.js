// Action types

export const ACCESS = "ACCESS";

// Actions

export function handleAccess(data) {
  return {
    type: ACCESS,
    payload: data,
  };
}
