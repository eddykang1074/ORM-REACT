import React, { useState } from 'react'

const ProductManager = () => {
    //단일 상품정보 데이터 구조 정의 및 초기화
    const [product, setProduct] = useState({
        productName: '',
        price: 0,
        stock: 0,
        manufacturer: '',
    })

    //상품목록 데이터 구조 정의 및 초기화
    const [productList, setProductList] = useState([])

    //제품정보 입력처리 이벤트 핸들러
    const handleProduct = (e) => {
        //리액트에서는 UI요소와 바인딩된 데이터 소스(객체-참조타입)의 값을 변경할떄
        //데이터 소스가 변경되었는지를 자동으로 감지합니다, 그런데 참조타입을 그냥 복사하거나
        //그냥 속성의 값을 그대로 변경하는경우  메모리주소가 변경되지 않기 떄문에 변경을 감지할수 없다.
        //그래서 DeepCopy의 일종인 spread연산자를 통해 원본 데이터 소스의 복사본(DeepCopy)를 만들어
        //복사본의 새로운 메모리주소와 공간을 할당해서 객체가 변경되게 처리하여 데이터 변경사실을 데이터바인딩 엔진에게 알려줍니다.

        //하기방식대로 직접적인 속성값을 변경하거나 복사본을 만들어서 변경해도
        //리액트 데이터바인딩 엔진에서는 참조타입의 데이터 변경사실을 인지하지못해 화면요소를 재렌더링하지 않는다.
        // product.productName ="강창훈";
        // var newProduct = product; //swallow copy
        // newProduct.productName ="test";

        //그래서 결론은 참조타입의 데이터를 사용해 리액트에서 데이터바인딩을 사용하려면
        //참조타입의 속성/값이 변경시킬떄는 반드시 DeepCopy(spread연산자)를 통해 별도 복사본을 만들고
        //새로 메모리를 할당해 데이터바인딩 엔진에 변경사실을 알려줘야 화면이 다시 그려진다.
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    //저장버튼 클릭 이벤트 핸들러 함수
    const handleSave = () => {
        //기본 상품 배열 목록에 등록하려는 단일상품객체의 복사본을 만들어 추가해준다.
        setProductList([...productList, { ...product }])
        handleInit()
    }

    //초기화 버튼 클릭 이벤트 핸들러
    const handleInit = () => {
        setProduct({
            productName: '',
            price: 0,
            stock: 0,
            manufacturer: '',
        })
    }

    //상품목록 생성 함수 정의
    const productUIList = productList.map((pro, i) => (
        // ui요소에 반복적으로 map을 이용해 바인딩하는경우 ui요소에 key속성을 유일값으로 바인딩해줘야한다.
        <tr key={i}>
            <td>{pro.productName}</td>
            <td>{pro.price}</td>
            <td>{pro.stock}</td>
            <td>{pro.manufacturer}</td>
            <td>
                <button>선택</button>
                <button>삭제</button>
            </td>
        </tr>
    ))

    //단일 상품정보 선택시 상단 폼에 선택정보 표시하기
    const handleSelect = (pro) => {
        //배열에서 선택한 단일 상품정보로 폼에 바인딩된 단일상품정보로 변경처리한다.
        setProduct(pro)
    }

    //상품 목록 배열에서 선택 상품정보 삭제처리 하고 재 바인딩하기
    const handleRemove = (pro) => {
        //배열데이터에서 특정조건에 해당하는 데이터 복사본 목록을 조회할떄는 filter()메소드 사용
        //배열안에 제품명이 삭제하려는 제품명과 다른것으로 조회하면 결국 삭제하려는 아이템 만 뺴고 모두 조회하는 결과물이 만들어집니다.
        const filteredProductList = productList.filter((p) => p.productName !== pro.productName)
        setProductList(filteredProductList)
    }

    return (
        <div>
            <h1>제품정보 관리화면</h1>
            제품명:
            <input type="text" name="productName" value={product.productName} onChange={handleProduct} />
            <br />
            가격:
            <input type="text" name="price" value={product.price} onChange={handleProduct} />
            <br />
            재고:
            <input type="text" name="stock" value={product.stock} onChange={handleProduct} />
            <br />
            제조사:
            <input type="text" name="manufacturer" value={product.manufacturer} onChange={handleProduct} />
            <br />
            <hr></hr>
            <button onClick={handleSave}>저장</button>
            <button onClick={handleInit}>초기화</button>
            <hr></hr>
            <table>
                <thead>
                    <tr>
                        <th>제품명</th>
                        <th>가격</th>
                        <th>재고량</th>
                        <th>제조사</th>
                        <th>선택/삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {productUIList} */}

                    {productList.map((pro, i) => (
                        // ui요소에 반복적으로 map을 이용해 바인딩하는경우 ui요소에 key속성을 유일값으로 바인딩해줘야한다.
                        <tr key={i}>
                            <td>{pro.productName}</td>
                            <td>{pro.price}</td>
                            <td>{pro.stock}</td>
                            <td>{pro.manufacturer}</td>
                            <td>
                                <button onClick={() => handleSelect(pro)}>선택</button>
                                <button onClick={() => handleRemove(pro)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductManager
