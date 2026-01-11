import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { increment } from "../features/counter/counterSlice";

function App() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="text-2xl font-bold">Counter: {value}</div>
      <button
        className="px-3 py-2 rounded bg-black text-white"
        onClick={() => dispatch(increment())}
      >
        +1
      </button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
