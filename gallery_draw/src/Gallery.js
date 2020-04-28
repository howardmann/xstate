import React from 'react';
import {interpret} from 'xstate'
import galleryDB from './data/galleryDB'
import GalleryMachine from './stateMachine/galleryMachine'

// get images and categories array (image belongs to a category)
const {images, categories} = galleryDB
const categoryId = categories[0].id // first id
// max index position of category array
const maxImagePos = images.filter(el => el.categoryId === categoryId).length - 1

// Set the initial context for the gallery machine based on above paramaters
const initialContext = {
  idx: 0,
  min: 0,
  max: maxImagePos,
  categoryId: categoryId
}
// When building custom context need instantiate new machine
const myGalleryMachine = GalleryMachine.withContext(initialContext)

// Simple async timeout function to simulate async
let wait = function (ms) {return new Promise(resolve => setTimeout(resolve, ms))}


class Gallery extends React.Component {  
  state = {
    current: myGalleryMachine.withContext(initialContext).initialState,
    images,
    categories
  }
  // boilerplate
  service = interpret(myGalleryMachine).onTransition(current => 
    this.setState({current})
  )
  componentDidMount(){
    this.service.start()
  }
  componentWillUnmount(){
    this.service.stop()
  }
  // simple helper to find image object based on categoryId and index position
  getImage = () => {
    let {current, images} = this.state
    let imagePos = current.context.idx
    let categoryId = current.context.categoryId
    let filterImages = images.filter(el => el.categoryId === categoryId)
    return filterImages[imagePos]
  }
  // XState actions simulate async with resolve
  handleUpdateCategory = async (id) => {
    this.service.send('UPDATE_CATEGORY', {categoryId: id})
    await wait(1000)
    this.service.send('RESOLVE')
  }
  handleNext = async () => {
    this.service.send('NEXT')
    await wait(300)
    this.service.send('RESOLVE')
  }
  handlePrev = async () => {
    this.service.send('PREV')
    await wait (300)
    this.service.send('RESOLVE')
  }
  
  render() {
    let {current} = this.state
    let {idx, min, max} = current.context
    let image = this.getImage()
    // Simple predicate function to determine if at min or max
    let hasPrev = idx > 0 ? true : false
    let hasNext = idx < max ? true : false
    let isMin = idx === min
    let isMax = idx === max
    let isMid = (idx < max) && (idx > min)

    return (
      <div>
        <p>current: {JSON.stringify(current.value)}</p>
        <p>context: {JSON.stringify(current.context)}</p>

        {categories.map(el => (
            <span>
              <button 
                style={{backgroundColor: current.context.categoryId === el.id ? 'gainsboro' : 'white'}}
                onClick={() => {this.handleUpdateCategory(el.id)}}>{el.name} | {el.id}</button>
            </span>
        ))}

        {/* Carousel circle icons */}
        {isMin && <p>&#9679; &#9675; &#9675;</p>}
        {isMax && <p>&#9675; &#9675; &#9679;</p>}
        {isMid && <p>&#9675; &#9679; &#9675;</p>}


        <p>{image.meta}</p>
        {hasPrev && 
          <button disabled={current.matches('category.loading')} onClick={() => this.handlePrev()}>PREV</button>
        }

        {hasNext && 
          <button disabled={current.matches('category.loading')} onClick={() => this.handleNext()}>NEXT</button>
        }
        <br/>
        
        {current.matches('category.loading') && <p>...loading</p>}
        
        {current.matches('category.image') && 
          <img width="50%" src={image.imageURL} alt={image.meta}/>
        }
        <br/>        
      </div>
    );
  }
}


export default Gallery;
