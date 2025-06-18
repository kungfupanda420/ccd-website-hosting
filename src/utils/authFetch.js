export async function authFetch(url, options = {}) {
  let accessToken = localStorage.getItem('access_token');
  let refreshToken = localStorage.getItem('refresh_token');

  // Attach Authorization header
  options.headers = {
    ...(options.headers || {}),
    "Authorization": `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  // Only try refresh if we get a 401 Unauthorized
  if (response.status === 401 && refreshToken) {
    // Try to refresh token
    const refreshResponse = await fetch("/api/auth/refresh_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      // Retry original request with new access token
      options.headers["Authorization"] = `Bearer ${data.access_token}`;
      response = await fetch(url, options);

      // If the new access token is also invalid, redirect to home/root
      if (response.status === 401) {
        localStorage.removeItem('acces_token');
        localStorage.removeItem('refresh_token');
        window.location.href = "/";
        throw new Error("Session expired. Please login again.");
      }
    } else {
      // Refresh failed, clear tokens and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }
  }

  return response;
}