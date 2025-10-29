export default function Cart(){
        const orderedItems=cc.cart.map((items, index) =>(
            <div key={index} className="item-div">
                <div className='container'>
                    <div className='middle'>
                        <div className="square"></div>
                    </div>
                    <div className="container-row">
                        <div className="item-name">Carrot Snack</div>
                        <div className="button-container ">
                            <div className="middle">-</div>
                            <div className="middle">5</div>
                            <div className="middle">+</div>
                        </div>
                    </div>
                    <div className='middle'>$1.20</div>
                </div>
            </div>
        ))


    return <div className="item">
        {orderedItems}
        </div>
}            