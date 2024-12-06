import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
export type JWTPayload = {
  name: string;
  role: string;
  exp: number;
};

interface AuthState {
  role: string | null;
  name: string | null;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  role: null,
  name: null,
  loading: true,
  accessToken: null,
  refreshToken: null,
};

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return rejectWithValue("No refresh token found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access_token);
    if (data.refresh_token) {
      localStorage.setItem("refreshToken", data.refresh_token);
    }

    return data;
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (isNeedAuth: boolean, { dispatch }) => {
    const token = localStorage.getItem("accessToken");

    if (!token || token === "undefined") {
      if (isNeedAuth) {
        await dispatch(refreshToken());
      }
      return null;
    }

    const payload = JSON.parse(atob(token.split(".")[1])) as JWTPayload;

    if (payload.exp * 1000 < Date.now()) {
      await dispatch(refreshToken());
      return null;
    }

    return {
      accessToken: token,
      payload,
    };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.name = action.payload.payload.name;
          state.role = action.payload.payload.role;
          state.accessToken = action.payload.accessToken;
        }
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        return { ...initialState, loading: false };
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
      });
  },
});

export const { logout } = authSlice.actions;

const selectAuthState = (state: { auth: AuthState }) => state.auth;

export const selectAuth = createSelector(
  [selectAuthState],
  (auth) => ({
    name: auth.name,
    role: auth.role,
    loading: auth.loading,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
  })
);

export default authSlice.reducer;