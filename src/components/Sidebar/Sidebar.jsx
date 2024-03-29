import './Sidebar.scss';
import { useState} from 'react';

const Sidebar = ({sendData}) => {
    const [sliderValue, setSliderValue] = useState(1800);
    const [categories, setCategories] = useState([]);
  
    const updateValue = (sliderValue) => {
        setSliderValue(sliderValue.target.value);
        sendData(sliderValue.target.value);
    }

    const updateCategory = (e) => {
        const updatedCategory = e.target.value;
    
        setCategories(categories => {
            if (!categories.includes(updatedCategory) && e.target.checked) {
                sendData(sliderValue, [...categories, updatedCategory]);
                return [...categories, updatedCategory];
            } else {
                const updatedCategories = categories.filter(category => category !== updatedCategory);
                sendData(sliderValue, updatedCategories);
                return updatedCategories;
            }
        });
    };

    return (
        <div className='sidebar-wrapper'>
            <div className='filters'>
                <div className="price-filter filter-item">
                    <h3>Price Range</h3>
                    <div className="price-range">
                        <input type="range" className="price-input form-range" min={0} max={1200} value={sliderValue} onChange={updateValue}/>

                        <span>$0 - ${sliderValue}</span>
                    </div>
                </div>

                <div className="category-filter filter-item">
                    <h3>Category</h3>
                    
                    <div className='category-list'>
                        <label>
                            <input type="checkbox" value="gaming" onChange={updateCategory}/>
                            Gaming
                        </label>
                        <label>
                            <input type="checkbox" value="watch" onChange={updateCategory}/>
                            Watch
                        </label>
                        <label>
                            <input type="checkbox" value="laptop" onChange={updateCategory}/>
                            Laptop
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;