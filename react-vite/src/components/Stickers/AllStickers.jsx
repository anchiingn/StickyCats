import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { thunkLoadAllStickers } from "../../redux/stickerReducer";
import './Stickers.css'
import StickerCards from "./StickerCards"
// import AddToCart from "../Cart/AddToCart"
import AddToFavorite from "../Favorites/AddToFavorite";

export default function AllStickers() {
   

    const dispatch = useDispatch()
    const allStickers = useSelector(state => state?.stickers)
    const user = useSelector(state => state.session.user)
    const [loadMore, setLoadMore] = useState(12)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(thunkLoadAllStickers())
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [dispatch])

    const stickers = Object.values(allStickers)


    // -------------------  Pagination  ------------------- //
    const loadMoreStickers = () => {
        setLoadMore(prev => prev + 12)
    }


    return (
        <>
            {isLoading ? (
                <h2 style={{ margin: 'auto' }}>Loading...</h2>
            ) : (
                <>
                    <div className="stickers-toppart_container">
                        <span>Explore Stickers </span> /
                    </div>

                    <div className="allStickers_container">
                        <p>Explore stickers from around the world, where each one is a delightful tiny masterpiece. <br />Brimming with cuteness and playful charm, they're sure to bring a smile to your day.</p>
                        <div className="line-in-between"></div>
                        
                        {/* <div>
                            <div> Sort By</div>
                            <div>{stickers.length} stickers</div>
                        </div> */}

                        <div className="sticker_wrapper">
                            <div className="sticker_filter">
                                <div>filter</div>
                                <div>all</div>
                                <div>cute</div>
                                <div>cool</div>
                                <div>anime</div>
                                <div>animal</div>
                                <div>food</div>
                            </div>

                            <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                                {/* <div className="sort-filter">sort</div> */}

                                <div className="sticker-cards_container">
                                    {stickers.slice(0, loadMore).map(sticker => {

                                        return (
                                            <div key={sticker?.id} className="stickers_container">
                                                <StickerCards sticker={sticker} />

                                                {/* add and remove from favorite */}
                                                <AddToFavorite sticker={sticker} />
                                            </div>
                                        )
                                    })}
                                </div>
                                {loadMore >= stickers.length
                                    ? (null)
                                    : (<div onClick={loadMoreStickers} id="load-more">Load More Stickers</div>)
                                }
                            </div>
                        </div>
                    </div>


                </>

            )}

        </>
    )
}