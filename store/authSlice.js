import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setToken = createAsyncThunk(
  "auth/setToken",
  async (value = null) => {
    const val = await value;
    return val;
  }
);
export const setUserDetails = createAsyncThunk(
  "auth/setUserDetails",
  async ({
    Id = null,
    phoneNumber = null,
    userName = null,
    emailAddress = null,
    firstName = null,
    lastName = null,
  }) => {
    const val = await {
      Id: Id,
      phoneNumber: phoneNumber,
      userName: userName,
      emailAddress: emailAddress,
      firstName: firstName,
      lastName: lastName,
    };
    return val;
  }
);

const auth = createSlice({
  name: "auth",
  initialState: {
    Id: null,
    phoneNumber: null,
    userName: null,
    emailAddress: null,
    firstName: null,
    lastName: null,
    token: null,
  },

  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(setUserDetails.fulfilled, (state, action) => {
        const { Id, phoneNumber, userName, emailAddress, firstName, lastName } =
          action.payload;
        state.phoneNumber = phoneNumber;
        state.Id = Id;
        state.userName = userName;
        state.emailAddress = emailAddress;
        state.firstName = firstName;
        state.lastName = lastName;
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload;
      }),
});

export default auth.reducer;
