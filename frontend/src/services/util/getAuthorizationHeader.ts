const getAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export default getAuthorizationHeader;
