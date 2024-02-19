import logo from './logo.svg'
import './App.css'

import DataBindingTest from './DataBindingTest'

import PrimitiveTypeEvent from './PrimitiveTypeEvent'

import ReferTypeEvent from './ReferTypeEvent'

import ProductManager from './ProductManager'

function App() {
    return (
        <div className="App">
            <DataBindingTest></DataBindingTest>
            <hr></hr>
            <PrimitiveTypeEvent></PrimitiveTypeEvent>
            <hr></hr>
            <ReferTypeEvent></ReferTypeEvent>

            <hr></hr>
            <ProductManager></ProductManager>
        </div>
    )
}

export default App
