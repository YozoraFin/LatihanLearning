import Dataset from '../data/dataset.json';
import { Link } from 'react-router-dom';

function Home({ username }) {
    const yourChoice = Dataset.sort((a, b) => a.bestSellingRank - b.bestSellingRank);
    
    return (
        <div className='background-home'>
            <div className="container px-5 py-3 bg-white fyp rounded-2 home-container">
                <div>
                    <h1 className='pt-3 pb-5'>{`Your Choice, ${username}!`}</h1>
                    <div className="gap-5 pb-5 text-center row justify-content-center align-items-center">
                    {yourChoice && yourChoice.slice(0, 5).map(pilihan => {
                            return (
                                <Link to={`/product/${pilihan.objectID}`} key={pilihan.objectID} className="p-3 col-2 box box-product rounded-3">
                                    <img className="pb-3 box-img" src={pilihan.image} alt="Thumbnail" width={150} height={150} />
                                    <p className='text-truncate'>{pilihan.name}</p>
                                    <p className='fs-2 fw-bold'>${pilihan.salePrice}</p>
                                </Link>  
                            ); 
                        })
                    }
                    </div>
                    <div className="text-center">
                        <Link to="/product" className="btn btn-primary">
                            View All Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;