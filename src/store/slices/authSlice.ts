import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '@/config/urls';

// Define the shape of our User and AuthState
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthResponse {
  success?: boolean;
  message?: string;
  token?: string;
  data?: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface VerifyEmailPayload {
  email: string;
  verifyCode: string;
}

interface ResendVerificationPayload {
  email: string;
}

type AuthThunkState = {
  auth: AuthState;
};

type AuthThunkConfig = {
  state: AuthThunkState;
  rejectValue: string;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong';
};

// Initial state, checking localStorage for an existing token
const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  error: null,
};

const BASE_URL = API_BASE_URL;
const API_URL = `${BASE_URL}/auth`;

// Async Thunks
export const registerUser = createAsyncThunk<AuthResponse, Record<string, unknown>, AuthThunkConfig>(
  'auth/register',
  async (userData: Record<string, unknown>, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = (await response.json()) as AuthResponse;
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to register');
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials, AuthThunkConfig>(
  'auth/login',
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const normalizedCredentials = {
        ...credentials,
        email: credentials.email?.trim().toLowerCase(),
        password: credentials.password?.trim(),
      };

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizedCredentials),
      });

      const data = (await response.json()) as AuthResponse;
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to login');
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchMe = createAsyncThunk<AuthResponse, void, AuthThunkConfig>(
  'auth/me',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    
    if (!token) return thunkAPI.rejectWithValue('No token found');

    try {
      const response = await fetch(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = (await response.json()) as AuthResponse;
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to fetch user');
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const verifyEmailUser = createAsyncThunk<AuthResponse, VerifyEmailPayload, AuthThunkConfig>(
  'auth/verifyEmail',
  async (verifyData, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verifyData),
      });

      const data = (await response.json()) as AuthResponse;
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to verify email');
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const resendVerificationUser = createAsyncThunk<AuthResponse, ResendVerificationPayload, AuthThunkConfig>(
  'auth/resendVerification',
  async (resendData, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resendData),
      });

      const data = (await response.json()) as AuthResponse;
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to resend verification email');
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateUserProfile = createAsyncThunk<AuthResponse, Record<string, unknown>, AuthThunkConfig>(
  'auth/updateProfile',
  async (profileData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    
    if (!token) return thunkAPI.rejectWithValue('No token found');

    try {
      // NOTE: user routes are at /users, not /auth
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(profileData),
      });

      const data = (await response.json()) as AuthResponse;
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Failed to update profile');
      }
      return data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('guestMode');
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        // Do not auto-login on registration. Let the user manually login.
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to register';
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token ?? null;
        if (typeof window !== 'undefined') {
          if (action.payload.token) {
            localStorage.setItem('token', action.payload.token);
          }
          localStorage.removeItem('guestMode');
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to login';
      })
      // Fetch Me
      .addCase(fetchMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data ?? null;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        if (typeof window !== 'undefined') localStorage.removeItem('token');
      })
      // Verify Email
      .addCase(verifyEmailUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmailUser.fulfilled, (state) => {
        state.isLoading = false;
        if (state.user) state.user.isVerified = true;
      })
      .addCase(verifyEmailUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to verify email';
      })
      // Resend Verification Code
      .addCase(resendVerificationUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendVerificationUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendVerificationUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to resend verification email';
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data ?? null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to update profile';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
