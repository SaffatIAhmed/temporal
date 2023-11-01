import { useState } from 'react'
import Button from 'react-bootstrap/Button';

export const App = ()=> {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Hello World</h1>
        <Button variant='primary' onClick={() => setCount(count + 1)}>Count is: { count }</Button>
      </div>
    </>
  )
}

export default App
