import React from 'react';
import {interpret} from 'xstate'
// import galleryDB from './data/galleryDB'
import galleryDb from './data-access/gallery-db'
import GalleryMachine from './stateMachine/galleryMachine'
// Library detect swipes
import {Swipeable} from 'react-swipeable'

let loadInitialState = async () =>{
  let {listCategories, listImages} = galleryDb

  let categories = await listCategories()
  let images = await listImages()

  let categoryId = categories[0].id // first id
  let maxImagePos = images.filter(el => el.categoryId === categoryId).length - 1

  // Update context
  const initialContext = {
    idx: 0,
    min: 0,
    max: maxImagePos,
    categoryId: categoryId
  }
  return {
    myGalleryMachine: GalleryMachine.withContext(initialContext),
    images,
    categories    
  }
}


class Gallery extends React.Component {  
  state = {
    current: GalleryMachine.initialState,
    images: [],
    categories: []
  }
  // boilerplate
  service = interpret(GalleryMachine).onTransition(current => 
    this.setState({current})
  )

  componentDidMount = async () => {
    const {images, categories, myGalleryMachine} = await loadInitialState()    
    this.setState({categories, images, current: myGalleryMachine.initialState})

    // update service boilerplate with machine with custom context
    this.service = interpret(myGalleryMachine).onTransition(current =>this.setState({current}))    
    this.service.start()
  }
  componentWillUnmount(){
    this.service.stop()
  }
  
  render() {
    let {current, images, categories} = this.state
    let {send} = this.service
    let {idx, min, max, categoryId} = current.context
    // Simple predicate function to determine if at min or max
    let hasPrev = idx > 0 ? true : false
    let hasNext = idx < max ? true : false
    let isMin = idx === min
    let isMax = idx === max
    let isMid = (idx < max) && (idx > min)
    let getMaxImagePos = (categoryId) =>  images.filter(el => el.categoryId === categoryId).length - 1

    let getImage = ({images, idx, categoryId}) => {            
      if (images.length > 0) {
        return  images.filter(el => el.categoryId == categoryId).reverse()[idx]
      }
      return {}
    }

    let image = getImage({images, idx, categoryId})

    return (
      <div>

        {hasPrev && 
          <button disabled={current.matches('category.loading')} onClick={() => send('PREV')}>PREV</button>
        }

        <span>{"      "}</span>

        {hasNext && 
          <button disabled={current.matches('category.loading')} onClick={() => send('NEXT')}>NEXT</button>
        }
        <br/>
        
        {current.matches('category.loading') && <p>⏳</p>}
        {current.matches('category.error') && <p> ❌ </p>}
        
        <Swipeable 
          onSwipedRight={() => send('PREV')} 
          onSwipedLeft={() => send('NEXT')}
        >
          <img width="50%"
            style={current.matches('category.loading') || current.matches('category.error') ? {display: 'none'} : {}}
            src={image.imageURL} 
            onLoad={() => send('RESOLVE')}
            onError={() => send('REJECT')}
            alt={image.meta}
          />
        </Swipeable>

        {/* Carousel circle icons */}
        {isMin && <p>&#9679; &#9675; &#9675;</p>}
        {isMax && <p>&#9675; &#9675; &#9679;</p>}
        {isMid && <p>&#9675; &#9679; &#9675;</p>}

        <p>{image.meta}</p>

        {/* CATEGORIES */}
        {categories.map(el => (
            <span>
              <button 
                style={{backgroundColor: current.context.categoryId === el.id ? 'gainsboro' : 'white'}}
                onClick={() => send('UPDATE_CATEGORY', { categoryId: el.id, max: getMaxImagePos(el.id) })}>{el.name}</button>
            </span>
        ))}


        <br/>        
      </div>
    );
  }
}


export default Gallery;
