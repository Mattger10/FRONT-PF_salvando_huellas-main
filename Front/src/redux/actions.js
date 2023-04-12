// Action types

export const ACCESS = "ACCESS";

// Actions

export function access(data) {
  return {
    type: ACCESS,
    payload: data,
  };
}
