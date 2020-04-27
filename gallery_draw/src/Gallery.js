import React from 'react';
import reducer from './reducer/GalleryReducer'
import {getImage, hasPrevPos, hasNextPos} from './util/gallery'

let Category = (props) => (
  <span>
    <button onClick={() => {props.handleUpdateCategory(props.id)}}>{props.name} | {props.id}</button>
  </span>
)

class Gallery extends React.Component {
  state = {
    // current: TrafficLightMachine.initialState,
    current: 'boom',
    reducer: reducer(undefined, {})
  }
  async dispatch(action){
    let newState = reducer(this.state.reducer, action)
    await this.setState({reducer: newState})
  }
  handleNext = () => {
    console.log('boom');
    this.dispatch({type: 'NEXT_IMAGE'})
  }
  handlePrev = () => {
    this.dispatch({type: 'PREV_IMAGE'})
  }
  handleUpdateCategory = (categoryId) => {
    this.dispatch({type: 'UPDATE_CATEGORY', categoryId: +categoryId})
  }


  // service = interpret(TrafficLightMachine).onTransition(current => 
  //   this.setState({current})
  // )

  // componentDidMount(){
  //   this.service.start()
  // }

  // componentWillUnmount(){
  //   this.service.stop()
  // }

  
  render() {
    let {images, categories} = this.state.reducer
    let {categoryId, imagePos} = this.state.reducer.filter
    let image = getImage(images, {categoryId, imagePos})
    let hasPrev = hasPrevPos(imagePos)
    let hasNext = hasNextPos(images, {categoryId, imagePos})

    return (
      <div>
        {categories.map(el => (
          <Category handleUpdateCategory={this.handleUpdateCategory} name={el.name} id={el.id}/>
        ))}
        <p>{image.meta}</p>
        <p>
          {hasPrev && <button onClick={() => this.handlePrev()}>PREV_IMAGE</button>} 
          {hasNext && <button onClick={() => this.handleNext()}>NEXT_IMAGE</button>}
        </p>
        
        <img width="50%" src={image.imageURL} alt={image.meta}/>
        
        <br/>
        
        {JSON.stringify(this.state.reducer)}
      </div>
    );
  }
}


export default Gallery;
