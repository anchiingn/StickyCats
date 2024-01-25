import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { thunkCreateNewStickers } from '../../redux/stickerReducer';

export default function NewSticker () {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [message, setMessage] = useState('');
    const [submit, setSubmit] = useState(false)
    const [validation, setValidation] = useState({})

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const errors = {}
            if (!title) {
                errors.title = 'Title is required';
            }
            if (!price) {
                errors.price = 'Price is required';
            }
            if (price && /[a-z]/.test(price)) {
                errors.price = 'Must be number'
            }
            if (!image) {
                errors.image = 'Image is required';
            }
            if (!height) {
                errors.height = 'height is required';
            }
            if (!width) {
                errors.width = 'width is required';
            }
            if (message && message.length > 500) {
                errors.message = 'Must contain 500 characters long'
            }
        
    
        setValidation(errors);
    
    }, [title, image, price, height, width, message]);

    const onSubmit = async (e) => {
        e.preventDefault()
        
       setSubmit(true)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("price", price)
        formData.append("image", image)
        formData.append("height", height)
        formData.append("width", width)
        formData.append("message", message)

        await dispatch(thunkCreateNewStickers(formData))
        // await dispatch(thunkLoadAllStickers())
        navigate('/my-stickers')
    }

    return (
        <>
        <div className="stickers-toppart_container">
            <NavLink to={'/'} className={'navlink'}>Home</NavLink> 
            /
            <NavLink to={'/launch-sticker'} className={'navlink'}>Launch Sticker</NavLink> 
            /
            <NavLink className={'navlink'} style={{cursor:'default'}}>Create Sticker</NavLink>
        </div>
        <div className='container'>
            <div className='sticker-form_container' style={{marginBottom:'200px'}}>
                    <div>New Sticker</div>
                    <form onSubmit={onSubmit} encType="multipart/form-data" className='create-form'>
                    {validation.title && submit && <p className="errors">{validation.title}</p>}
                    {validation.price && submit && <p className="errors">{validation.price}</p>}
                    {validation.image && submit && <p className="errors">{validation.image}</p>}
                    {validation.height && submit && <p className="errors">{validation.height}</p>}
                    {validation.width && submit && <p className="errors">{validation.width}</p>}
                    {validation.message && submit && <p className="errors">{validation.message}</p>}

                        <label>Image <span style={{color:'var(--color-red)'}}>*</span> </label>
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            
                            />
                        <label>Title <span style={{color:'var(--color-red)'}}>*</span> </label>
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Price <span style={{color:'var(--color-red)'}}>*</span> </label>
                        <input 
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div className='height-width_container'>
                            <label>Height <span style={{color:'var(--color-red)'}}>*</span> </label>
                            <input 
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <label>Width <span style={{color:'var(--color-red)'}}>*</span> </label>
                            <input 
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </div>
                        <label>Message</label>
                        <textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button>Submit</button>
                    </form>
            </div>
        </div> 
        </>
    )
}