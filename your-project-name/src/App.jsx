import { useCallback, useRef } from 'react'
import './App.css'


const fakeApi = (text) => {
  new Promise(resolve => {
    setTimeout(() => {
      const hasGood = '//good'
      const hasBad = '//bad'
      const label = hasGood ? 'Positive' : hasBad ? 'Negative' : 'Neutral'
      resolve({label, confidence: math.random().tofixed(2)})
    },700)
  })
}

const aanlyzeText = createAsyncThunk('analyzeText', async (text) => {
  const response = await fakeApi(text)
  return response
})

const slice = createSlice({
  name: 'analyze',
  initalState: {
    text: "",
    result: null,
    loading : false,
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload
    },
    setResult: (state, action) => {
      state.result = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

const store = configureStore({
  reducer: {
    sentiment: slice.reducer
  }
})

const useDebounce = (fn, delay) => {
  const t = useRef()

  return useCallback((
    ...args ) => {
      clearTimeout(t.current);
      t.current = setTimeout
    
  },[fn, delay])
}
function Dashboard() {
  const {text, result, loading} = useSelector(state => state.sentiment)
  const dispatch = useDispatch()
  const debounce = useDebounce((value) => value && dispatch(aanlyzeText(value)), 500)

  const handleChange = (e) => {
    const value = e.target.value
    dispatch(value)
    debounce(value)

  }

  return (
    <div>
      <header>
        <h2>React Sentiment</h2>
      </header>

      <section>
        <label>Enter text to analyze</label>
        <textarea>
          value={text}
          onchange={handleChange}
        </textarea>
      </section>

      <section>
        <h3>Result</h3>
        <>
          <p>sentiment: {result?.label}</p>
          <p>confidence: {result?.confidence}</p>
        </>
      </section>
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  )
}

export default App
