import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface StateData {
  bills: any[];
  error: string;
  loading: boolean;
  categories: any[];
}
const initialState: StateData = {
  bills: [],
  error: '',
  loading: false,
  categories: [],
};

export const fetchBills = createAsyncThunk(
  'fetchBills',
  async (_, ThunkApi) => {
    try {
      const { data } = await axios(
        'https://new1-production.up.railway.app/bills'
      );

      return data;
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchBillsByCategories = createAsyncThunk(
  'fetchBillsByCategories',
  async (category: any, ThunkApi) => {
    try {
      const { data } = await axios(
        `https://new1-production.up.railway.app/bills/categories/${category}`
      );
      return data;
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const createBill = createAsyncThunk(
  'createBill',
  async (billData: any, ThunkApi) => {
    try {
      await axios.post(
        'https://new1-production.up.railway.app/bills',
        billData
      );
      const { data } = await axios(
        'https://new1-production.up.railway.app/bills'
      );
      return data;
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const updateBill = createAsyncThunk(
  'updateBill',
  async (billData: any, ThunkApi) => {
    try {
      await axios.patch(
        `https://new1-production.up.railway.app/bills/${billData?.id}`,
        billData
      );
      const { data } = await axios(
        'https://new1-production.up.railway.app/bills',
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      return data;
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteBill = createAsyncThunk(
  'deleteBill',
  async (id: any, ThunkApi) => {
    try {
      await axios.delete(`https://new1-production.up.railway.app/bills/${id}`);
      const { data } = await axios(
        'https://new1-production.up.railway.app/bills'
      );
      return data;
    } catch (error: any) {
      return ThunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

export const billSlice: any = createSlice({
  name: 'billData',
  initialState,
  reducers: {},

  extraReducers: (builders) => {
    builders.addCase(fetchBills.pending, (state, action) => {
      state.bills = [];
    });
    builders.addCase(fetchBills.fulfilled, (state, action) => {
      state.bills = action.payload.bills;
      state.categories = action.payload.categories;
    });
    builders.addCase(fetchBills.rejected, (state: any, action) => {
      state.error = action.payload;
    });
    builders.addCase(updateBill.pending, (state, action) => {
      state.bills = [];
    });
    builders.addCase(updateBill.fulfilled, (state, action) => {
      state.bills = action.payload.bills;
      state.categories = action.payload.categories;
    });
    builders.addCase(updateBill.rejected, (state: any, action) => {
      state.error = action.payload;
    });
    builders.addCase(fetchBillsByCategories.pending, (state, action) => {
      state.bills = [];
    });
    builders.addCase(fetchBillsByCategories.fulfilled, (state, action) => {
      state.bills = action.payload;
    });
    builders.addCase(fetchBillsByCategories.rejected, (state: any, action) => {
      state.error = action.payload;
    });
    //
    builders.addCase(createBill.pending, (state, action) => {
      state.bills = [];
    });
    builders.addCase(createBill.fulfilled, (state, action) => {
      state.bills = action.payload.bills;
      state.categories = action.payload.categories;
    });
    builders.addCase(createBill.rejected, (state: any, action) => {
      state.error = action.payload;
    });
    //
    builders.addCase(deleteBill.pending, (state, action) => {
      state.bills = [];
    });
    builders.addCase(deleteBill.fulfilled, (state, action) => {
      state.bills = action.payload.bills;
      state.categories = action.payload.categories;
    });
    builders.addCase(deleteBill.rejected, (state: any, action) => {
      state.error = action.payload;
    });
  },
});

export default billSlice.reducer;
